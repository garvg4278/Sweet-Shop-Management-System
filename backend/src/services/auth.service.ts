// src/services/auth.service.ts
import prisma from "../prisma.js";
import bcrypt from "bcryptjs";
import { RegisterInput } from "../validators/auth.schema.js";

const SALT_ROUNDS = 10;

export async function createUser(data: RegisterInput) {
  const hashed = await bcrypt.hash(data.password, SALT_ROUNDS);

  return prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashed,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
}

export async function userExists(email: string): Promise<boolean> {
  const record = await prisma.user.findUnique({ where: { email } });
  return !!record;
}
