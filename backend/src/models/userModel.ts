import {
  prop,
  index,
  modelOptions,
  Severity,
  pre,
  getModelForClass,
} from "@typegoose/typegoose";
import { v4 as uuidv4 } from "uuid";
import argon2 from "argon2";
import { logger } from "../utils/logger";
import crypto from "crypto";

export const privateFields = [
  "password",
  "verificationCode",
  "passwordResetToken",
];

@pre<User>("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  const hash = await argon2.hash(this.password);
  this.password = hash;
  return;
})
@index({ email: 1 })
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { allowMixed: Severity.ALLOW },
})
export class User {
  @prop({ required: true, lowercase: true, unique: true })
  email: string;

  @prop({ required: true })
  userName: string;

  @prop({ required: true })
  password: string;

  @prop({ required: true, default: uuidv4() })
  verificationCode: string;

  @prop()
  passwordResetToken: string | null;

  @prop({ default: false })
  userVerified: boolean;

  async matchPasswords(this: User, loginPassword: string) {
    try {
      return await argon2.verify(this.password, loginPassword);
    } catch (err) {
      logger.error(err, "Passwords do not match!");
      return false;
    }
  }

  createResetToken(this: User) {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    return resetToken;
  }
}

const UserModel = getModelForClass(User);

export default UserModel;
