import request from "supertest";
import app from "../src/server.js";
import prisma from "../src/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "test-secret";

beforeEach(async () => {
  await prisma.user.deleteMany({});
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Auth - Login", () => {
  it("should login successfully and return a JWT with sub = user.id", async () => {
    const hashed = await bcrypt.hash("pass1234", 10);
    const user = await prisma.user.create({
      data: {
        name: "Test User",
        email: "test@example.com",
        password: hashed,
      },
    });

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "pass1234" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("user");

    const decoded = jwt.verify(res.body.token, JWT_SECRET);
    expect(decoded).toHaveProperty("sub", user.id);

    expect(res.body.user).toMatchObject({
      id: user.id,
      email: user.email,
      role: "user",
    });
  });

  it("should fail when email does not exist", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "unknown@example.com", password: "anything" });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
  });

  it("should fail when password is incorrect", async () => {
    const hashed = await bcrypt.hash("correctpass", 10);
    await prisma.user.create({
      data: {
        name: "Jane",
        email: "jane@example.com",
        password: hashed,
      },
    });

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "jane@example.com", password: "wrongpass" });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
  });
});
