import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { ReactNode } from "react";

export default function AdminRoute({
    children,
}: {
    children: ReactNode;
}) {
    const { token, role, loading } = useAuth();

    // ⏳ Wait for auth hydration
    if (loading) return null;

    // 🚫 Not logged in
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // 🚫 Logged in but not admin
    if (role !== "ADMIN") {
        return <Navigate to="/" replace />;
    }

    // ✅ Admin allowed
    return <>{children}</>;
}
