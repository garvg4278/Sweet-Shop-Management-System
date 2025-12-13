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

describe("Inventory API", () => {
  it("should allow a user to purchase a sweet and decrease quantity", async () => {
    const sweet = await prisma.sweet.create({
      data: {
        name: "Ladoo",
        category: "Dry",
        price: 10,
        quantity: 10,
      },
    });

    const userToken = jwt.sign({ sub: "user-1" }, JWT_SECRET);

    const res = await request(app)
      .post(`/api/sweets/${sweet.id}/purchase`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ quantity: 3 });

    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(7);
  });

  it("should reject purchase if quantity is insufficient", async () => {
    const sweet = await prisma.sweet.create({
      data: {
        name: "Peda",
        category: "Milk",
        price: 15,
        quantity: 2,
      },
    });

    const userToken = jwt.sign({ sub: "user-1" }, JWT_SECRET);

    const res = await request(app)
      .post(`/api/sweets/${sweet.id}/purchase`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ quantity: 5 });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message");
  });

  it("should allow admin to restock a sweet", async () => {
    const sweet = await prisma.sweet.create({
      data: {
        name: "Barfi",
        category: "Milk",
        price: 20,
        quantity: 5,
      },
    });

    const adminToken = jwt.sign(
      { sub: "admin-1", role: "admin" },
      JWT_SECRET
    );

    const res = await request(app)
      .post(`/api/sweets/${sweet.id}/restock`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ quantity: 10 });

    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(15);
  });

  it("should reject restock by non-admin", async () => {
    const sweet = await prisma.sweet.create({
      data: {
        name: "Halwa",
        category: "Grain",
        price: 12,
        quantity: 5,
      },
    });

    const userToken = jwt.sign({ sub: "user-1" }, JWT_SECRET);

    const res = await request(app)
      .post(`/api/sweets/${sweet.id}/restock`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ quantity: 5 });

    expect(res.status).toBe(403);
  });
});
