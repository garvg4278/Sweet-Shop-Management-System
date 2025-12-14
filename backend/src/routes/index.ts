import { Router } from "express";
import authRouter from "./auth.routes.js";
import sweetsRouter from "./sweets.routes.js";
import requestRoutes from "./request.routes";
import adminRoutes from "./admin.routes.js";


const router = Router();

router.use("/auth", authRouter);
router.use("/sweets", sweetsRouter);
router.use("/requests", requestRoutes);
router.use("/admin", adminRoutes);


export default router;
