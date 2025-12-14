import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service.js";

export async function registerController(req: Request, res: Response) {
  const user = await registerUser(req.body);

  return res.status(201).json({
    message: "User registered successfully",
    id: user.id,
    email: user.email,
  });
}

export async function loginController(req: Request, res: Response) {
  const result = await loginUser(req.body);
  return res.json(result);
}
