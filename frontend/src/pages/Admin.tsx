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
            alert("Sweet added");
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
        <div className="admin-page">
            <h2>Admin Dashboard</h2>

            <div className="card">
                <h3>Add Sweet</h3>

                <div className="sweets-filters">
                    <input
                        placeholder="name"
                        value={form.name}
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        }
                    />
                    <input
                        placeholder="category"
                        value={form.category}
                        onChange={(e) =>
                            setForm({ ...form, category: e.target.value })
                        }
                    />
                    <input
                        placeholder="price"
                        type="number"
                        value={form.price}
                        onChange={(e) =>
                            setForm({ ...form, price: e.target.value })
                        }
                    />
                    <input
                        placeholder="quantity"
                        type="number"
                        value={form.quantity}
                        onChange={(e) =>
                            setForm({ ...form, quantity: e.target.value })
                        }
                    />
                </div>

                <button
                    onClick={() => createMutation.mutate()}
                    disabled={createMutation.isPending}
                >
                    {createMutation.isPending ? "Adding..." : "Add Sweet"}
                </button>
            </div>

            <div className="admin-list">
                {sweets.map((s: any) => (
                    <div key={s.id} className="admin-item">
                        <span>
                            {s.name} (Qty: {s.quantity})
                        </span>

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
