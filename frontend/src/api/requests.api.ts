import api from "./axios";

export async function createRequest(data: {
    sweetId: string;
    quantity: number;
    unit: "kg" | "piece";
}) {
    const res = await api.post("/requests", data);
    return res.data;
}

export async function getMyRequests() {
    const res = await api.get("/requests/me");
    return res.data;
}

export async function getAllRequests() {
    const res = await api.get("/requests");
    return res.data;
}

export async function fulfillRequest(id: string) {
    const res = await api.patch(`/requests/${id}/fulfill`);
    return res.data;
}
