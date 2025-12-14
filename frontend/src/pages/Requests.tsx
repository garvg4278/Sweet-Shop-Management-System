import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSweets } from "../api/sweets.api";
import { createRequest, getMyRequests } from "../api/requests.api";
import StatusBadge from "../components/StatusBadge";

export default function Requests() {
    const qc = useQueryClient();

    const [sweetId, setSweetId] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [unit, setUnit] = useState<"kg" | "piece">("kg");

    /* Load inventory for dropdown */
    const { data: sweets = [] } = useQuery({
        queryKey: ["sweets"],
        queryFn: getSweets,
    });

    /* Load user requests */
    const { data: requests = [], isLoading } = useQuery({
        queryKey: ["my-requests"],
        queryFn: getMyRequests,
    });

    /* Create request */
    const createMutation = useMutation({
        mutationFn: createRequest,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["my-requests"] });
            setQuantity(1);
            setSweetId("");
        },
    });

    function submitRequest() {
        if (!sweetId || quantity <= 0) return;

        createMutation.mutate({
            sweetId,
            quantity,
            unit,
        });
    }

    return (
        <div className="page">
            <h2>Create Request</h2>

            <div className="card">
                <select
                    value={sweetId}
                    onChange={(e) => setSweetId(e.target.value)}
                >
                    <option value="">Select Sweet</option>
                    {sweets.map((s: any) => (
                        <option key={s.id} value={s.id}>
                            {s.name} ({s.category})
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    placeholder="Quantity"
                />

                <select value={unit} onChange={(e) => setUnit(e.target.value as any)}>
                    <option value="kg">kg</option>
                    <option value="piece">piece</option>
                </select>

                <button onClick={submitRequest} disabled={createMutation.isPending}>
                    Send Request
                </button>
            </div>

            <h2>My Requests</h2>

            {isLoading && <p>Loading...</p>}

            {!isLoading && requests.length === 0 && (
                <p style={{ opacity: 0.6 }}>
                    You haven’t made any requests yet.
                </p>
            )}

            {requests.map((r: any) => (
                <div key={r.id} className="card">
                    <p>
                        <strong>{r.sweet.name}</strong>
                    </p>
                    <p>
                        {r.quantity} {r.unit}
                    </p>
                    <StatusBadge status={r.status} />
                </div>
            ))}
        </div>
    );
}
