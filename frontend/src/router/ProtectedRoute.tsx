import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { ReactNode } from "react";

export default function ProtectedRoute({
    children,
}: {
    children: ReactNode;
}) {
    const { token, loading } = useAuth();

    // ⏳ Wait until auth state is restored
    if (loading) {
        return null; // later you can add a spinner here
    }

    // 🚫 Not logged in → redirect to login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // ✅ Logged in → allow access
    return <>{children}</>;
}
