import prisma from "../prisma.js";
import { DomainError } from "../errors/domain.error.js";

export async function purchaseSweet(sweetId: string, qty: number) {
  const sweet = await prisma.sweet.findUnique({ where: { id: sweetId } });

  if (!sweet) throw new DomainError("Sweet not found");
  if (sweet.quantity < qty) throw new DomainError("Insufficient stock");

  return prisma.sweet.update({
    where: { id: sweetId },
    data: { quantity: sweet.quantity - qty },
  });
}

export async function restockSweet(sweetId: string, qty: number) {
  const sweet = await prisma.sweet.findUnique({ where: { id: sweetId } });

  if (!sweet) throw new DomainError("Sweet not found");

  return prisma.sweet.update({
    where: { id: sweetId },
    data: { quantity: sweet.quantity + qty },
  });
}

export async function deleteSweet(sweetId: string) {
  const sweet = await prisma.sweet.findUnique({ where: { id: sweetId } });

  if (!sweet) throw new DomainError("Sweet not found");

  await prisma.sweet.delete({ where: { id: sweetId } });
}

/* ---------------- SEARCH ---------------- */

export type SweetSearchFilters = {
  name?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
};

export async function searchSweets(filters: SweetSearchFilters) {
  const where: any = {};

  if (filters.name) {
    where.OR = [
      {
        name: {
          contains: filters.name,
        },
      },
      {
        category: {
          contains: filters.name,
        },
      },
    ];
  }

  if (filters.category) {
    where.category = filters.category;
  }

  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    where.price = {};
    if (filters.minPrice !== undefined) where.price.gte = filters.minPrice;
    if (filters.maxPrice !== undefined) where.price.lte = filters.maxPrice;
  }

  return prisma.sweet.findMany({ where });
}
