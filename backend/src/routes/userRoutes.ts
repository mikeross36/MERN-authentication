import { Router } from "express";
import validateSchema from "../middlewares/validateSchema";
import {
  forgotPasswordSchema,
  registerUserSchema,
  resetPasswordSchema,
  verifyUserSchema,
} from "../schemas/userSchemas";
import {
  forgotPasswordHandler,
  registerUserHandler,
  resetPasswordHandler,
  verifyUserHandler,
} from "../controllers/userController";

const router = Router();

router.post(
  "/api/v1/users",
  validateSchema(registerUserSchema),
  registerUserHandler
);

router.post(
  "/api/v1/users/verify/:userId/:verificationCode",
  validateSchema(verifyUserSchema),
  verifyUserHandler
);

router.post(
  "/api/v1/users/forgot-password",
  validateSchema(forgotPasswordSchema),
  forgotPasswordHandler
);

router.post(
  "/api/v1/users/reset-password/:resetToken",
  validateSchema(resetPasswordSchema),
  resetPasswordHandler
);

export default router;
