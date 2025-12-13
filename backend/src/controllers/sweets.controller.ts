import { Router } from "express";
import prisma from "../prisma.js";
import authGuard from "../middleware/authGuard.js";
import adminGuard from "../middleware/adminGuard.js";
import { validate } from "../middleware/validate.js";
import { inventorySchema } from "../validators/inventory.schema.js";
import { searchSweetSchema } from "../validators/search.schema.js";
import {
    purchaseSweet,
    restockSweet,
    deleteSweet,
    searchSweets,
} from "../services/sweet.service.js";

const router = Router();

/* ---------------- SEARCH ---------------- */
router.get(
    "/search",
    validate(searchSweetSchema),
    async (req, res) => {
        const sweets = await searchSweets({
            name: req.query.name as string | undefined,
            category: req.query.category as string | undefined,
            minPrice: req.query.minPrice
                ? Number(req.query.minPrice)
                : undefined,
            maxPrice: req.query.maxPrice
                ? Number(req.query.maxPrice)
                : undefined,
        });

        return res.status(200).json(sweets);
    }
);

/* ---------------- CREATE ---------------- */
router.post("/", authGuard, adminGuard, async (req, res) => {
    const { name, category, price, quantity } = req.body ?? {};

    if (!name || !category || price == null || quantity == null) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const sweet = await prisma.sweet.create({
        data: { name, category, price, quantity },
    });

    return res.status(201).json(sweet);
});

/* ---------------- LIST ---------------- */
router.get("/", async (_req, res) => {
    const sweets = await prisma.sweet.findMany();
    return res.status(200).json(sweets);
});

/* ---------------- PURCHASE ---------------- */
router.post(
    "/:id/purchase",
    authGuard,
    validate(inventorySchema),
    async (req, res) => {
        const updated = await purchaseSweet(req.params.id, req.body.quantity);
        return res.status(200).json(updated);
    }
);

/* ---------------- RESTOCK ---------------- */
router.post(
    "/:id/restock",
    authGuard,
    adminGuard,
    validate(inventorySchema),
    async (req, res) => {
        const updated = await restockSweet(req.params.id, req.body.quantity);
        return res.status(200).json(updated);
    }
);

/* ---------------- DELETE ---------------- */
router.delete(
    "/:id",
    authGuard,
    adminGuard,
    async (req, res) => {
        await deleteSweet(req.params.id);
        return res.status(204).send();
    }
);

export default router;
