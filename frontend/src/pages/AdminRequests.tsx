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

            <div className="requests-table">
                <div className="requests-header">
                    <span>User</span>
                    <span>Sweet</span>
                    <span>Quantity</span>
                    <span>Status</span>
                    <span>Action</span>
                </div>

                {data.map((r: any) => (
                    <div key={r.id} className="requests-row">
                        <span>{r.user.email}</span>
                        <span>{r.sweet.name}</span>
                        <span>{r.quantity} {r.unit}</span>
                        <StatusBadge status={r.status} />

                        {r.status === "PENDING" ? (
                            <button onClick={() => fulfill.mutate(r.id)}>
                                Fulfill
                            </button>
                        ) : (
                            <span>—</span>
                        )}
                    </div>
                ))}
            </div>

        </div>
    );
}
