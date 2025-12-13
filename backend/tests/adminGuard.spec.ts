import request from "supertest";
import jwt from "jsonwebtoken";
import express from "express";
import authGuard from "../src/middleware/authGuard.js";
import adminGuard from "../src/middleware/adminGuard.js";

const JWT_SECRET = process.env.JWT_SECRET || "test-secret";

// Minimal app for middleware chaining
const testApp = express();
testApp.use(express.json());

testApp.get("/admin-only", authGuard, adminGuard, (req, res) => {
  return res.status(200).json({ ok: true });
});

describe("adminGuard Middleware", () => {
  it("should reject request if user is not admin", async () => {
    const token = jwt.sign({ sub: "user-001" }, JWT_SECRET);

    const res = await request(testApp)
      .get("/admin-only")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(403);
  });

  it("should allow access if user is admin", async () => {
    const token = jwt.sign(
      { sub: "admin-123", role: "admin" },
      JWT_SECRET
    );

    const res = await request(testApp)
      .get("/admin-only")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
  });
});
