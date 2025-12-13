import { useNavigate } from "react-router-dom";
import { login, register } from "../api/auth.api";

export function useAuth() {
    const navigate = useNavigate();

    async function loginUser(data: { email: string; password: string }) {
        const res = await login(data);
        localStorage.setItem("token", res.token);
        navigate("/sweets");
    }

    async function registerUser(data: {
        name: string;
        email: string;
        password: string;
    }) {
        await register(data);
        navigate("/login");
    }

    function logout() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return { loginUser, registerUser, logout };
}
