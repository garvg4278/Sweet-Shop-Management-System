import { createContext, useContext, useEffect, useState } from "react";
import { loginApi, registerApi } from "../api/auth.api";
import { jwtDecode } from "jwt-decode";

type JwtPayload = {
    userId: string;
    role: "user" | "admin"; // ✅ MATCH BACKEND
    exp: number;
};

type AuthContextType = {
    token: string | null;
    role: "user" | "admin" | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [role, setRole] = useState<"user" | "admin" | null>(null);
    const [loading, setLoading] = useState(true);

    // 🔁 Restore session
    useEffect(() => {
        const stored = localStorage.getItem("token");

        if (stored) {
            try {
                const decoded = jwtDecode<JwtPayload>(stored);
                setToken(stored);
                setRole(decoded.role);
            } catch {
                localStorage.removeItem("token");
            }
        }

        setLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        const res = await loginApi({ email, password });
        const token = res.data.token;

        const decoded = jwtDecode<JwtPayload>(token);

        localStorage.setItem("token", token);
        setToken(token);
        setRole(decoded.role); // ✅ admin/user set here
    };

    const register = async (name: string, email: string, password: string) => {
        await registerApi({ name, email, password });
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setRole(null);
    };

    return (
        <AuthContext.Provider
            value={{ token, role, loading, login, register, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return ctx;
};
