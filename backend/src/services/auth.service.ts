import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prisma.js";
import { DomainError } from "../errors/domain.error.js";

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new DomainError("User already exists");
  }

  // Check if an admin already exists
  const adminExists = await prisma.user.findFirst({
    where: { role: "admin" },
  });

  // Decide role safely
  let role: "user" | "admin" = "user";

  if (
    !adminExists &&
    process.env.ADMIN_BOOTSTRAP_EMAIL &&
    data.email === process.env.ADMIN_BOOTSTRAP_EMAIL
  ) {
    role = "admin";
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role,
    },
  });

  // Never return password
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
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
