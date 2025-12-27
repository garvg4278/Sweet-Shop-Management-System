import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSweets } from "../api/sweets.api";
import { createSweet, restockSweet, deleteSweet } from "../api/admin.api";

export default function Admin() {
    const queryClient = useQueryClient();

    const [form, setForm] = useState({
        name: "",
        category: "",
        price: "",
        quantity: "",
    });

    const { data: sweets = [] } = useQuery({
        queryKey: ["sweets"],
        queryFn: getSweets,
    });

    const createMutation = useMutation({
        mutationFn: () =>
            createSweet({
                name: form.name,
                category: form.category,
                price: Number(form.price),
                quantity: Number(form.quantity),
            }),
        onSuccess: () => {
            setForm({ name: "", category: "", price: "", quantity: "" });
            queryClient.invalidateQueries({ queryKey: ["sweets"] });
        },
    });

    const restockMutation = useMutation({
        mutationFn: ({ id, qty }: { id: string; qty: number }) =>
            restockSweet(id, qty),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["sweets"] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => deleteSweet(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["sweets"] });
        },
    });

    return (
        <div className="page">
            <h2>Admin Dashboard</h2>

            {/* ===== ADD SWEET ===== */}
            <div className="card">
                <h3>Add Sweet</h3>

                <div className="admin-form">
                    <input
                        placeholder="Name"
                        value={form.name}
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        }
                    />
                    <input
                        placeholder="Category"
                        value={form.category}
                        onChange={(e) =>
                            setForm({ ...form, category: e.target.value })
                        }
                    />
                    <input
                        placeholder="Price"
                        type="number"
                        value={form.price}
                        onChange={(e) =>
                            setForm({ ...form, price: e.target.value })
                        }
                    />
                    <input
                        placeholder="Quantity"
                        type="number"
                        value={form.quantity}
                        onChange={(e) =>
                            setForm({ ...form, quantity: e.target.value })
                        }
                    />

                    <button
                        onClick={() => createMutation.mutate()}
                        disabled={createMutation.isPending}
                    >
                        {createMutation.isPending ? "Adding..." : "Add Sweet"}
                    </button>
                </div>
            </div>

            {/* ===== INVENTORY TABLE ===== */}
            <h3 style={{ marginTop: "2rem" }}>Inventory</h3>

            <div className="admin-table">
                <div className="admin-table-header">
                    <span>Sweet</span>
                    <span>Stock</span>
                    <span>Restock</span>
                    <span>Action</span>
                </div>

                {sweets.map((s: any) => (
                    <div key={s.id} className="admin-table-row">
                        <span>{s.name}</span>
                        <span>{s.quantity}</span>

                        <button
                            onClick={() =>
                                restockMutation.mutate({ id: s.id, qty: 10 })
                            }
                        >
                            +10
                        </button>

                        <button
                            className="danger"
                            onClick={() => deleteMutation.mutate(s.id)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
