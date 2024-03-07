import { Request, Response, NextFunction } from "express";

const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;

  if (!user) {
    return res.status(403).json({ message: "You are not logged in!" });
  }
  return next();
};

export default isLoggedIn;
