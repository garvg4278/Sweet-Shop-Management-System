export function useAuthState() {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role"); // "user" | "admin"

    return {
        isLoggedIn: !!token,
        isAdmin: role === "admin",
        isUser: role === "user",
    };
}
