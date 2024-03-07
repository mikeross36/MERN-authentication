import { Router } from "express";
import validateSchema from "../middlewares/validateSchema";
import { createSessionSchema } from "../schemas/sessionSchemas";
import {
  createSessionHandler,
  deleteSessionHandler,
} from "../controllers/sessionController";
import isLoggedIn from "../middlewares/isLoggedIn";

const router = Router();

router.post(
  "/api/v1/sessions",
  validateSchema(createSessionSchema),
  createSessionHandler
);

router.delete("/api/v1/sessions", isLoggedIn, deleteSessionHandler);

export default router;
