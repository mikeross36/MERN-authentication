import { Request, Response } from "express";
import {
  ForgotPasswordInput,
  RegisterUserInput,
  ResetPasswordInput,
  VerifyUserInput,
} from "../schemas/userSchemas";
import {
  createUser,
  findUserByEmail,
  findUserById,
  findUserByResetToken,
} from "../services/userService";
import Email from "../utils/mailer";
import config from "config";
import { logger } from "../utils/logger";
import crypto from "crypto";

const prodOrigin = config.get<string>("prodOrigin");
const devOrigin = config.get<string>("devOrigin");

export async function registerUserHandler(
  req: Request<{}, {}, RegisterUserInput>,
  res: Response
) {
  const body = req.body;

  try {
    const user = await createUser(body);
    const url =
      process.env.NODE_ENV === "development"
        ? `${devOrigin}/verify/${user._id}/${user.verificationCode}`
        : `${prodOrigin}/verify/${user._id}/${user.verificationCode}`;

    await new Email(user, url).sendWelcomeEmail();

    return res
      .status(201)
      .json({
        status: "success",
        message:
          "User successflly registered! Check your email to verify account",
      });
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "Account already exists!" });
    }
    return res.status(500).send(err);
  }
}

export async function verifyUserHandler(
  req: Request<VerifyUserInput, {}, {}>,
  res: Response
) {
  const { userId, verificationCode } = req.params;
  const user = await findUserById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }
  if (user.userVerified) {
    return res
      .status(400)
      .json({ message: "User's account is already verified!" });
  }
  if (user.verificationCode === verificationCode) {
    user.userVerified = true;
    await user.save();

    return res.status(200).json({
      status: "success",
      message: "Your account is successfully verified!",
    });
  }
  return res.status(400).json({ message: "Account verification failed!" });
}

export async function forgotPasswordHandler(
  req: Request<{}, {}, ForgotPasswordInput>,
  res: Response
) {
  const message = "If registered, user will receive a password reset email";
  const { email } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    logger.debug(`User with email ${email} does not exist!`);
    return res
      .status(404)
      .json({ message: `User with email ${email} does not exist!` });
  }

  if (!user.userVerified) {
    return res.status(401).json({ message: "User's account is not verified!" });
  }

  const resetToken = user.createResetToken();
  await user.save();

  const resetUrl =
    process.env.NODE_ENV === "development"
      ? `${devOrigin}/reset-password/${resetToken}`
      : `${prodOrigin}/reset-password/${resetToken}`;

  await new Email(user, resetUrl).sendPasswordReset();

  logger.debug(`Password reset token sent to email ${email}`);

  return res.status(200).json({ status: "success", message: message });
}

export async function resetPasswordHandler(
  req: Request<ResetPasswordInput["params"], {}, ResetPasswordInput["body"]>,
  res: Response
) {
  const { resetToken } = req.params;
  const { password } = req.body;

  const hashedResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await findUserByResetToken(hashedResetToken);

  if (
    !user ||
    !user.passwordResetToken ||
    user.passwordResetToken !== hashedResetToken
  ) {
    return res.status(400).json({ message: "Ivalid reset token!" });
  }
  user.passwordResetToken = null;
  user.password = password;
  await user.save();

  return res
    .status(200)
    .json({ status: "success", message: "Password successfully reset!" });
}
