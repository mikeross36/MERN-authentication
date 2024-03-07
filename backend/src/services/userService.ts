import UserModel from "../models/userModel";
import { RegisterUserInput } from "../schemas/userSchemas";

export function createUser(input: RegisterUserInput) {
  return UserModel.create(input);
}

export function findUserById(id: string) {
  return UserModel.findById(id);
}

export function findUserByEmail(email: string) {
  return UserModel.findOne({ email });
}

export function findUserByResetToken(hashedResetToken: string) {
  return UserModel.findOne({ passwordResetToken: hashedResetToken });
}
