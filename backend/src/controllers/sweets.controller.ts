// src/controllers/sweets.controller.ts
import { Router } from "express";
import { purchaseSweet, restockSweet } from "../services/sweet.service.js";
import prisma from "../prisma.js";
import authGuard from "../middleware/authGuard.js";
import adminGuard from "../middleware/adminGuard.js";


const router = Router();

// -------------------- CREATE SWEET (ADMIN ONLY) --------------------
router.post("/", authGuard, adminGuard, async (req, res) => {
  const { name, category, price, quantity } = req.body ?? {};

  // Basic validation for RED → GREEN tests
  if (!name || !category || price == null || quantity == null) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const sweet = await prisma.sweet.create({
    data: {
      name,
      category,
      price,
      quantity,
    },
  });

  return res.status(201).json(sweet);
});

// -------------------- LIST SWEETS --------------------
router.get("/", async (_req, res) => {
  const sweets = await prisma.sweet.findMany();
  return res.status(200).json(sweets);
  
});

// -------------------- PURCHASE SWEET --------------------
router.post("/:id/purchase", authGuard, async (req, res) => {
  const { quantity } = req.body ?? {};

  if (!quantity || quantity <= 0) {
    return res.status(400).json({ message: "Invalid quantity" });
  }

  try {
    const updated = await purchaseSweet(req.params.id, quantity);
    return res.status(200).json(updated);
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
});

// -------------------- RESTOCK SWEET (ADMIN) --------------------
router.post("/:id/restock", authGuard, adminGuard, async (req, res) => {
  const { quantity } = req.body ?? {};

  if (!quantity || quantity <= 0) {
    return res.status(400).json({ message: "Invalid quantity" });
  }

  try {
    const updated = await restockSweet(req.params.id, quantity);
    return res.status(200).json(updated);
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
});


export default router;
