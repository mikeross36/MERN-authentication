import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwtUtils";
import { refreshAccessToken } from "../services/sessionService";
import config from "config";

const attachUserToRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken =
    req.cookies.accessToken ||
    (req.headers.authorization || "").replace(/^Bearer\s/, "");

  if (!accessToken) return next();

  const decoded = verifyJwt(accessToken, "accessTokenPublicKey");

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  const refreshToken = req.cookies.refreshToken;

  if (refreshToken) {
    const newAccessToken = await refreshAccessToken(refreshToken);

    res.cookie("accessToken", newAccessToken, {
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

    const result = verifyJwt(newAccessToken as string, "accessTokenPublicKey");

    res.locals.user = result.decoded;

    return next();
  }

  return next();
};

export default attachUserToRequest;
