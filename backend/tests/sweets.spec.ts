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

describe("Sweets API", () => {
  it("should allow admin to create a sweet", async () => {
    const adminToken = jwt.sign(
      { sub: "admin-id", role: "admin" },
      JWT_SECRET
    );

    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Kaju Katli",
        category: "Barfi",
        price: 120,
        quantity: 50,
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("Kaju Katli");
  });

  it("should reject non-admin user from creating sweet", async () => {
    const userToken = jwt.sign({ sub: "user-id" }, JWT_SECRET);

    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        name: "Rasgulla",
        category: "Syrup",
        price: 30,
        quantity: 100,
      });

    expect(res.status).toBe(403);
  });

  it("should list all sweets", async () => {
    await prisma.sweet.create({
      data: {
        name: "Gulab Jamun",
        category: "Fried",
        price: 20,
        quantity: 200,
      },
    });

    const res = await request(app).get("/api/sweets");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
  });
});
