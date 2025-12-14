import { Router } from "express";
import authRouter from "./auth.routes.js";
import sweetsRouter from "./sweets.routes.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/sweets", sweetsRouter);

export default router;
