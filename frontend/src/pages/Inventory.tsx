import { useQuery } from "@tanstack/react-query";
import { getSweets } from "../api/sweets.api";
import SweetCard from "../components/SweetCard";

export default function Inventory() {
    const { data: sweets = [], isLoading } = useQuery({
        queryKey: ["sweets"],
        queryFn: getSweets,
    });

    if (isLoading) return <p className="page-loading">Loading inventory...</p>;

    return (
        <div className="page">
            {/* Header */}
            <div className="page-header">
                <h2>Inventory</h2>
                <p className="page-subtitle">
                    Current stock available in the shop
                </p>
            </div>

            {/* Grid */}
            <div className="inventory-grid">
                {sweets.map((sweet) => (
                    <SweetCard key={sweet.id} sweet={sweet} />
                ))}
            </div>
        </div>
    );
}
