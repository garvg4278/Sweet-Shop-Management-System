import bcrypt from "bcryptjs";

export async function verifyPassword(raw: string, hashed: string) {
  return bcrypt.compare(raw, hashed);
}
