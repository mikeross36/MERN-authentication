import { Router } from "express";
import userRouter from "./userRoutes";
import sessionRouter from "./sessionRoutes";

const router = Router();

router.use(userRouter);
router.use(sessionRouter);

export default router;
