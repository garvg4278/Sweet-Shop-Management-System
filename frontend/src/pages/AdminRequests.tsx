import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getAllRequests,
    fulfillRequest,
} from "../api/requests.api";
import StatusBadge from "../components/StatusBadge";

export default function AdminRequests() {
    const queryClient = useQueryClient();

    const { data = [], isLoading } = useQuery({
        queryKey: ["all-requests"],
        queryFn: getAllRequests,
    });

    const fulfill = useMutation({
        mutationFn: fulfillRequest,
        onSuccess: () => {
            // refresh admin inbox
            queryClient.invalidateQueries({ queryKey: ["all-requests"] });
            // refresh user view
            queryClient.invalidateQueries({ queryKey: ["my-requests"] });
        },
    });

    if (isLoading) {
        return <p>Loading requests...</p>;
    }

    return (
        <div className="page">
            <h2>Requests Inbox</h2>

            {data.length === 0 && (
                <p style={{ opacity: 0.6 }}>
                    No pending requests.
                </p>
            )}

            {data.map((r: any) => (
                <div key={r.id} className="card">
                    <p>
                        <strong>User:</strong> {r.user.email}
                    </p>

                    <p>
                        <strong>Sweet:</strong> {r.sweet.name}
                    </p>

                    <p>
                        {r.quantity} {r.unit}
                    </p>

                    <StatusBadge status={r.status} />

                    {r.status === "PENDING" && (
                        <button onClick={() => fulfill.mutate(r.id)}>
                            Mark Fulfilled
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}
