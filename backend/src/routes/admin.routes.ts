import { Router } from "express";
import {
    createSweet,
    deleteSweet,
    restockSweet,
} from "../controllers/admin.controller.js";
import authGuard from "../middleware/authGuard.js";
import adminGuard from "../middleware/adminGuard.js";

const router = Router();

// 🔒 Admin-only
router.use(authGuard, adminGuard);

// Catalog management
router.post("/sweets", createSweet);
router.patch("/sweets/:id/restock", restockSweet);
router.delete("/sweets/:id", deleteSweet);

export default router;
