import { Router } from "express";
import authRouter from "./controllers/auth.controller.js";
import sweetsRouter from "./controllers/sweets.controller.js";

const router = Router();

// Auth endpoints
router.use("/auth", authRouter);

// Sweet endpoints
router.use("/sweets", sweetsRouter);

export default router;
