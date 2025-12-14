import api from "./axios";

export function createSweet(data: {
    name: string;
    category: string;
    price: number;
    quantity: number;
}) {
    return api.post("/admin/sweets", data);
}

export function restockSweet(id: string, qty: number) {
    return api.patch(`/admin/sweets/${id}/restock`, { quantity: qty });
}

export function deleteSweet(id: string) {
    return api.delete(`/admin/sweets/${id}`);
}
