import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "test-secret";

export function generateToken(userId: string) {
  return jwt.sign(
    { sub: userId },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
}
