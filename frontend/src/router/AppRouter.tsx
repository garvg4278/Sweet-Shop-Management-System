import { Routes, Route, Navigate } from "react-router-dom";

import Inventory from "../pages/Inventory";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Requests from "../pages/Requests";
import AdminRequests from "../pages/AdminRequests";
import Admin from "../pages/Admin";

import ProtectedRoute from "./ProtectedRoute";

export default function AppRouter() {
    return (
        <Routes>
            {/* ===================== */}
            {/* Public Routes */}
            {/* ===================== */}

            <Route path="/" element={<Inventory />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* ===================== */}
            {/* User Routes */}
            {/* ===================== */}

            <Route
                path="/requests"
                element={
                    <ProtectedRoute>
                        <Requests />
                    </ProtectedRoute>
                }
            />

            {/* ===================== */}
            {/* Admin Routes */}
            {/* ===================== */}

            <Route
                path="/admin"
                element={
                    <ProtectedRoute>
                        <Admin />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/requests"
                element={
                    <ProtectedRoute>
                        <AdminRequests />
                    </ProtectedRoute>
                }
            />

            {/* ===================== */}
            {/* Fallback */}
            {/* ===================== */}

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}
