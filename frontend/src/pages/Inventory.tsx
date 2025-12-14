import { useQuery } from "@tanstack/react-query";
import { getSweets } from "../api/sweets.api";
import SweetCard from "../components/SweetCard";

export default function Inventory() {
    const { data: sweets = [], isLoading } = useQuery({
        queryKey: ["sweets"],
        queryFn: getSweets,
    });

    if (isLoading) return <p>Loading inventory...</p>;

    return (
        <div className="inventory-page">
            <h2>Inventory</h2>

            <div className="sweets-grid">
                {sweets.map((sweet) => (
                    <SweetCard key={sweet.id} sweet={sweet} />
                ))}
            </div>
        </div>
    );
}
