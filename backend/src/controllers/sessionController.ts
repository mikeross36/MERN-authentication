import { Request, Response } from "express";
import { CreateSessionInput } from "../schemas/sessionSchemas";
import { findUserByEmail } from "../services/userService";
import { signAccessToken, signRefreshToken } from "../services/sessionService";
import config from "config";

export async function createSessionHandler(
  req: Request<{}, {}, CreateSessionInput>,
  res: Response
) {
  const message = "Invalid email or password!";
  const { email, password } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    return res.status(400).json(message);
  }
  if (!user.userVerified) {
    return res.status(401).json({ message: "User's account is not verified!" });
  }

  const isMatch = await user.matchPasswords(password);

  if (!isMatch) {
    return res.status(401).json(message);
  }

  const accessToken = signAccessToken(user);

  const refreshToken = await signRefreshToken({
    userId: user._id as unknown as string,
  });

  res.cookie("accessToken", accessToken, {
    maxAge: Number(
      new Date(
        Date.now() +
          Number(config.get("accessCookieMaxAge")) * 24 * 60 * 60 * 1000
      )
    ),
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "development" ? false : true,
  });

  res.cookie("refreshToken", refreshToken, {
    maxAge: Number(
      new Date(
        Date.now() +
          Number(config.get("refreshCookieMaxAge")) * 24 * 60 * 60 * 1000
      )
    ),
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "development" ? false : true,
  });

  res.status(200).json({
    status: "success",
    message: "Logged in successfully!",
    accessToken,
    refreshToken,
  });
}

export async function deleteSessionHandler(req: Request, res: Response) {
  res.cookie("accessToken", "", {
    maxAge: Number(new Date(Date.now() + 1 * 1000)),
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "development" ? false : true,
  });

  res.cookie("refreshToken", "", {
    maxAge: Number(new Date(Date.now() + 1 * 1000)),
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "development" ? false : true,
  });

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  return res.status(200).json({
    status: "success",
    message: "LOGGED OUT!",
    accessToken: null,
    refreshToken: null,
  });
}
