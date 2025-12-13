import request from "supertest";
import jwt from "jsonwebtoken";
import express from "express";
import authGuard from "../src/middleware/authGuard.js";

const JWT_SECRET = process.env.JWT_SECRET || "test-secret";

// Create minimal app for testing middleware only
const testApp = express();
testApp.use(express.json());

testApp.get("/protected", authGuard, (req, res) => {
  return res.status(200).json({ ok: true, userId: req.user!.id });
});

describe("authGuard Middleware", () => {
  it("should reject requests without Authorization header", async () => {
    const res = await request(testApp).get("/protected");
    expect(res.status).toBe(401);
  });

  it("should reject requests with invalid token", async () => {
    const res = await request(testApp)
      .get("/protected")
      .set("Authorization", "Bearer invalid_token");

    expect(res.status).toBe(401);
  });

  it("should allow valid token and attach req.user", async () => {
    const token = jwt.sign({ sub: "user-123" }, JWT_SECRET);

    const res = await request(testApp)
      .get("/protected")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("ok", true);
    expect(res.body).toHaveProperty("userId", "user-123");
  });
});
