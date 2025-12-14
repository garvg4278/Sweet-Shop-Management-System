import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { DomainError } from "../errors/domain.error.js";

export function errorHandler(
    err: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    // ✅ HANDLE ZOD VALIDATION ERRORS (TYPE-SAFE)
    if (err instanceof ZodError) {
        const zodError = err as ZodError<any>;

        return res.status(400).json({
            message: "Validation error",
            errors: zodError.issues,
        });
    }

    // ✅ HANDLE DOMAIN ERRORS
    if (err instanceof DomainError) {
        if (err.message === "Sweet not found") {
            return res.status(404).json({ message: err.message });
        }
        return res.status(400).json({ message: err.message });
    }

    // ✅ FALLBACK
    console.error("UNHANDLED ERROR:", err);
    return res.status(500).json({ message: "Internal server error" });
}
