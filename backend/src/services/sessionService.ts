import SessionModel from "../models/sessionModel";
import { User, privateFields } from "../models/userModel";
import { DocumentType } from "@typegoose/typegoose";
import { omit, get } from "lodash";
import { signJwt, verifyJwt } from "../utils/jwtUtils";
import config from "config";
import { findUserById } from "./userService";

export async function createSession({ userId }: { userId: string }) {
  return SessionModel.create({ user: userId });
}

export async function findSessionById(id: string) {
  return SessionModel.findById(id);
}

export function signAccessToken(user: DocumentType<User>) {
  const payload = omit(user.toJSON(), privateFields);

  const accessToken = signJwt({ ...payload }, "accessTokenPrivateKey", {
    expiresIn: config.get("accessTokenExpiresIn"),
  });

  return accessToken;
}

export async function signRefreshToken({ userId }: { userId: string }) {
  const session = await createSession({ userId });

  const refreshToken = signJwt(
    { session: session._id },
    "refreshTokenPrivateKey",
    { expiresIn: config.get("refreshTokenExpiresIn") }
  );

  return refreshToken;
}

export async function refreshAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const decoded = verifyJwt(refreshToken, "refreshTokenPublicKey");

  if (!decoded) return false;

  const session = await SessionModel.findById(get(decoded, "session")); // session id from signRefreshToken

  if (!session || !session.valid) return false;

  const user = await findUserById(String(session.user));

  if (!user) return false;

  const accessToken = signAccessToken(user);

  return accessToken;
}
