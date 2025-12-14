import type { Sweet } from "../api/sweets.api";

type Props = {
    sweet: Sweet;
    onPurchase: (id: string) => void;
};

export default function SweetCard({ sweet, onPurchase }: Props) {
    return (
        <div className="sweet-card">
            <h3>{sweet.name}</h3>
            <p>Category: {sweet.category}</p>
            <p>Price: ₹{sweet.price}</p>
            <p>Available: {sweet.quantity}</p>

            <button
                disabled={sweet.quantity === 0}
                onClick={() => onPurchase(sweet.id)}
            >
                {sweet.quantity === 0 ? "Out of stock" : "Buy 1"}
            </button>
        </div>
    );
}
