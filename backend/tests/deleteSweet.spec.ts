import request from "supertest";
import app from "../src/server.js";
import prisma from "../src/prisma.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "test-secret";

beforeEach(async () => {
  await prisma.sweet.deleteMany({});
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("DELETE /api/sweets/:id", () => {
  it("should allow admin to delete a sweet", async () => {
    const sweet = await prisma.sweet.create({
      data: {
        name: "Soan Papdi",
        category: "Dry",
        price: 40,
        quantity: 25,
      },
    });

    const adminToken = jwt.sign(
      { sub: "admin-1", role: "admin" },
      JWT_SECRET
    );

    const res = await request(app)
      .delete(`/api/sweets/${sweet.id}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(204);

    const found = await prisma.sweet.findUnique({
      where: { id: sweet.id },
    });

    expect(found).toBeNull();
  });

  it("should reject delete attempt by non-admin", async () => {
    const sweet = await prisma.sweet.create({
      data: {
        name: "Cham Cham",
        category: "Syrup",
        price: 30,
        quantity: 10,
      },
    });

    const userToken = jwt.sign({ sub: "user-1" }, JWT_SECRET);

    const res = await request(app)
      .delete(`/api/sweets/${sweet.id}`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.status).toBe(403);
  });

  it("should return 404 if sweet does not exist", async () => {
    const adminToken = jwt.sign(
      { sub: "admin-1", role: "admin" },
      JWT_SECRET
    );

    const res = await request(app)
      .delete("/api/sweets/non-existent-id")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(404);
  });
});
