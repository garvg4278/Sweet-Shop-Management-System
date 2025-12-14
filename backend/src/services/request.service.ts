import prisma from "../prisma";

export async function createRequest(
    userId: string,
    sweetId: string,
    quantity: number,
    unit: string
) {
    return prisma.request.create({
        data: {
            userId,
            sweetId,
            quantity,
            unit,
        },
    });
}

export async function getUserRequests(userId: string) {
    return prisma.request.findMany({
        where: { userId },
        include: {
            sweet: true,
        },
        orderBy: { createdAt: "desc" },
    });
}

export async function getAllRequests() {
    return prisma.request.findMany({
        include: {
            user: true,
            sweet: true,
        },
        orderBy: { createdAt: "desc" },
    });
}

export async function fulfillRequest(requestId: string) {
    return prisma.request.update({
        where: { id: requestId },
        data: { status: "FULFILLED" },
    });
}
