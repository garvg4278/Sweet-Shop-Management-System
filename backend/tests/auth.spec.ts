// tests/auth.spec.ts
import request from "supertest";
import app from "../src/server.js";
import prisma from "../src/prisma.js";

beforeEach(async () => {
  await prisma.user.deleteMany({});
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Auth - Register", () => {
  it("should register a new user and not return password", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ name: "Test User", email: "test@example.com", password: "pass1234" });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("email", "test@example.com");
    expect(res.body).not.toHaveProperty("password");
  });
});
