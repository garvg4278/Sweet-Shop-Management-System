type Status = "PENDING" | "APPROVED" | "REJECTED" | "FULFILLED";

const statusMap: Record<Status, string> = {
    PENDING: "status-pending",
    APPROVED: "status-approved",
    REJECTED: "status-rejected",
    FULFILLED: "status-fulfilled",
};

export default function StatusBadge({ status }: { status: Status }) {
    return (
        <span className={`status-badge ${statusMap[status]}`}>
            {status}
        </span>
    );
}
