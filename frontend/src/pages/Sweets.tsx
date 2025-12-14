import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSweets, searchSweets, purchaseSweet } from "../api/sweets.api";
import SweetCard from "../components/SweetCard";
import { useState } from "react";

export default function Sweets() {
    const queryClient = useQueryClient();

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const { data: sweets = [], isLoading } = useQuery({
        queryKey: ["sweets"],
        queryFn: getSweets,
    });

    const searchMutation = useMutation({
        mutationFn: () =>
            searchSweets({
                name: name || undefined,
                category: category || undefined,
                minPrice: minPrice ? Number(minPrice) : undefined,
                maxPrice: maxPrice ? Number(maxPrice) : undefined,
            }),
        onSuccess: (data) => {
            queryClient.setQueryData(["sweets"], data);
        },
    });

    const purchaseMutation = useMutation({
        mutationFn: (id: string) => purchaseSweet(id, 1),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["sweets"] });
        },
    });

    if (isLoading) return <p className="page-loading">Loading sweets...</p>;

    return (
        <div className="sweets-page">
            <h2 className="page-title">Sweets</h2>

            <div className="sweets-filters">
                <input
                    placeholder="Search name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />

                <input
                    placeholder="Min price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                />

                <input
                    placeholder="Max price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                />

                <button onClick={() => searchMutation.mutate()}>
                    Search
                </button>
            </div>

            <div className="sweets-grid">
                {sweets.map((sweet) => (
                    <SweetCard
                        key={sweet.id}
                        sweet={sweet}
                        onPurchase={(id) => purchaseMutation.mutate(id)}
                    />
                ))}
            </div>
        </div>
    );
}
