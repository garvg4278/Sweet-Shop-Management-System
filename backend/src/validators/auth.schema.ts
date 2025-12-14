import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, "Name required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 chars"),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type RegisterInput = z.infer<typeof registerSchema>;
