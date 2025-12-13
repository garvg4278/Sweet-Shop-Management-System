import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

export default function Login() {
    const { loginUser } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            setError("");
            await loginUser({ email, password });
        } catch {
            setError("Invalid email or password");
        }
    }

    return (
        <div className="auth-page">
            <form className="auth-card" onSubmit={handleSubmit}>
                <h2 className="auth-title">Login</h2>

                {error && <p className="auth-error">{error}</p>}

                <input
                    className="auth-input"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="auth-input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="auth-button" type="submit">
                    Login
                </button>

                <p className="auth-link">
                    New here? <Link to="/register">Register</Link>
                </p>
            </form>
        </div>
    );
}
