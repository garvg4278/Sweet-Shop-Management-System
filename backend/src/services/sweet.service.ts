import prisma from "../prisma.js";

export async function purchaseSweet(sweetId: string, qty: number) {
  const sweet = await prisma.sweet.findUnique({
    where: { id: sweetId },
  });

  if (!sweet) {
    throw new Error("Sweet not found");
  }

  if (sweet.quantity < qty) {
    throw new Error("Insufficient stock");
  }

  return prisma.sweet.update({
    where: { id: sweetId },
    data: {
      quantity: sweet.quantity - qty,
    },
  });
}

export async function restockSweet(sweetId: string, qty: number) {
  const sweet = await prisma.sweet.findUnique({
    where: { id: sweetId },
  });

  if (!sweet) {
    throw new Error("Sweet not found");
  }

  return prisma.sweet.update({
    where: { id: sweetId },
    data: {
      quantity: sweet.quantity + qty,
    },
  });
}
