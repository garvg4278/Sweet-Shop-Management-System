import type { Sweet } from "../api/sweets.api";

type Props = {
    sweet: Sweet;
};

export default function SweetCard({ sweet }: Props) {
    return (
        <div className="sweet-card">
            <h3>{sweet.name}</h3>
            <p>Category: {sweet.category}</p>
            <p>Current Stock: {sweet.quantity}</p>
        </div>
    );
}
