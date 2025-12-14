import api from "./axios";

export type Sweet = {
    id: string;
    name: string;
    category: string;
    price: number;
    quantity: number;
};

export async function getSweets() {
    const res = await api.get<Sweet[]>("/sweets");
    return res.data;
}

export async function searchSweets(params: {
    name?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
}) {
    const res = await api.get<Sweet[]>("/sweets/search", { params });
    return res.data;
}

export async function purchaseSweet(id: string, quantity: number) {
    const res = await api.post(`/sweets/${id}/purchase`, { quantity });
    return res.data;
}
