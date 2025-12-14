import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
    const navigate = useNavigate();
    const { logout, token, role } = useAuth();

    const isLoggedIn = Boolean(token);
    const isAdmin = role === "admin";

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/">🍬 Sweet Shop</Link>
            </div>

            <div className="navbar-right">
                {/* Everyone */}
                <Link to="/">Inventory</Link>

                {/* User */}
                {isLoggedIn && role === "user" && (
                    <Link to="/requests">My Requests</Link>
                )}

                {/* Admin */}
                {isLoggedIn && isAdmin && (
                    <>
                        <Link to="/admin/requests">Inbox</Link>
                        <Link to="/admin">Catalog</Link>
                    </>
                )}

                {/* Auth */}
                {isLoggedIn ? (
                    <button onClick={handleLogout} className="logout-btn">
                        Logout
                    </button>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}
