import { Request, Response } from "express";
import prisma from "../prisma.js";

export async function createSweet(req: Request, res: Response) {
    const { name, category, price, quantity } = req.body;

    const sweet = await prisma.sweet.create({
        data: {
            name,
            category,
            price,
            quantity,
        },
    });

    return res.status(201).json(sweet);
}

export async function restockSweet(req: Request, res: Response) {
    const { id } = req.params;
    const { quantity } = req.body;

    const sweet = await prisma.sweet.update({
        where: { id },
        data: {
            quantity: {
                increment: quantity,
            },
        },
    });

    return res.json(sweet);
}

export async function deleteSweet(req: Request, res: Response) {
    const { id } = req.params;

    await prisma.sweet.delete({
        where: { id },
    });

    return res.status(204).send();
}
