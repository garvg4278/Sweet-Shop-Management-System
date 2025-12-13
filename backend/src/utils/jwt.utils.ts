import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "test-secret";

export function verifyToken(token: string): { sub: string; role?: string } {
  return jwt.verify(token, JWT_SECRET) as { sub: string; role?: string };
}
