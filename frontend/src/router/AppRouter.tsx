import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
// import Sweets from "../pages/Sweets";
// import Admin from "../pages/Admin";

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/sweets" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* <Route path="/sweets" element={<Sweets />} />
            <Route path="/admin" element={<Admin />} /> */}
        </Routes>
    );
}
