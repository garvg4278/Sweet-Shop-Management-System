import { Router } from "express";

import getSweets from "../controllers/sweets.controller.js";
import searchSweets from "../controllers/sweets.controller.js";
import purchaseSweet from "../controllers/sweets.controller.js";
import deleteSweet from "../controllers/sweets.controller.js";

import authGuard from "../middleware/authGuard.js";
import adminGuard from "../middleware/adminGuard.js";

const router = Router();

router.get("/", getSweets);
router.get("/search", searchSweets);
router.post("/:id/purchase", authGuard, purchaseSweet);
router.delete("/:id", authGuard, adminGuard, deleteSweet);

export default router;
