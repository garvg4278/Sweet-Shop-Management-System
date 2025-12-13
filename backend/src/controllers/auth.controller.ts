// src/controllers/auth.controller.ts
import { Router } from "express";
import { validate } from "../middleware/validate.js";

// Validation schemas
import { registerSchema } from "../validators/auth.schema.js";
import { loginSchema } from "../validators/login.schema.js";

// Services
import { createUser, userExists } from "../services/auth.service.js";
import { generateToken } from "../services/token.service.js";

// Utils
import { verifyPassword } from "../utils/auth.utils.js";

// Prisma
import prisma from "../prisma.js";

const router = Router();

// --------------------------- REGISTER ---------------------------
router.post("/register", validate(registerSchema), async (req, res) => {
  const { email } = req.body;

  if (await userExists(email)) {
    return res.status(409).json({ message: "Email already registered" });
  }

  const user = await createUser(req.body);
  return res.status(201).json(user);
});

// --------------------------- LOGIN (REFACTORED) ---------------------------
router.post("/login", validate(loginSchema), async (req, res) => {
  const { email, password } = req.body;

  // 1) Find user
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // 2) Verify password
  const match = await verifyPassword(password, user.password);
  if (!match) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // 3) Create JWT token
  const token = generateToken(user.id);

  // 4) Return sanitized user + token
  return res.status(200).json({
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  });
});

export default router;
