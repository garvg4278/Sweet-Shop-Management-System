import prisma from "../prisma.js";
import { DomainError } from "../errors/domain.error.js";

export async function purchaseSweet(sweetId: string, qty: number) {
  const sweet = await prisma.sweet.findUnique({ where: { id: sweetId } });

  if (!sweet) {
    throw new DomainError("Sweet not found");
  }

  if (sweet.quantity < qty) {
    throw new DomainError("Insufficient stock");
  }

  return prisma.sweet.update({
    where: { id: sweetId },
    data: { quantity: sweet.quantity - qty },
  });
}

export async function restockSweet(sweetId: string, qty: number) {
  const sweet = await prisma.sweet.findUnique({ where: { id: sweetId } });

  if (!sweet) {
    throw new DomainError("Sweet not found");
  }

  return prisma.sweet.update({
    where: { id: sweetId },
    data: { quantity: sweet.quantity + qty },
  });
}

export async function deleteSweet(sweetId: string) {
  const sweet = await prisma.sweet.findUnique({
    where: { id: sweetId },
  });

  if (!sweet) {
    throw new DomainError("Sweet not found");
  }

  await prisma.sweet.delete({
    where: { id: sweetId },
  });
}