import request from "supertest";
import app from "../src/server.js";
import prisma from "../src/prisma.js";

beforeEach(async () => {
    await prisma.sweet.deleteMany({});

    await prisma.sweet.createMany({
        data: [
            { name: "Kaju Katli", category: "Barfi", price: 120, quantity: 10 },
            { name: "Milk Barfi", category: "Barfi", price: 80, quantity: 20 },
            { name: "Gulab Jamun", category: "Fried", price: 20, quantity: 50 },
        ],
    });
});

afterAll(async () => {
    await prisma.$disconnect();
});

describe("GET /api/sweets/search", () => {
    it("should search sweets by name", async () => {
        const res = await request(app).get("/api/sweets/search?name=barfi");

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(2);
    });

    it("should filter sweets by category", async () => {
        const res = await request(app).get("/api/sweets/search?category=Fried");

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0].name).toBe("Gulab Jamun");
    });

    it("should filter sweets by price range", async () => {
        const res = await request(app).get(
            "/api/sweets/search?minPrice=50&maxPrice=100"
        );

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0].name).toBe("Milk Barfi");
    });

    it("should combine multiple filters", async () => {
        const res = await request(app).get(
            "/api/sweets/search?name=barfi&category=Barfi&minPrice=50"
        );

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(2);
    });

    it("should return empty array if no match found", async () => {
        const res = await request(app).get("/api/sweets/search?name=laddu");

        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
    });
});
