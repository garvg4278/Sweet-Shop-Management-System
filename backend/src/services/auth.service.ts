import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prisma.js";
import { DomainError } from "../errors/domain.error.js";

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
  role?: string;
}) {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new DomainError("User already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role ?? "user", // ✅ default role
    },
  });

  // ✅ NEVER return password
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role, // ✅ REQUIRED
  };
}

export async function loginUser(data: {
  email: string;
  password: string;
}) {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    throw new DomainError("Invalid credentials");
  }

  const isValid = await bcrypt.compare(data.password, user.password);
  if (!isValid) {
    throw new DomainError("Invalid credentials");
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );

  // ✅ RETURN USER INFO WITH ROLE
  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  };
}
