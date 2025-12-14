export function isAdmin() {
    return localStorage.getItem("isAdmin") === "true";
}

export function setAdmin(value: boolean) {
    localStorage.setItem("isAdmin", String(value));
}
