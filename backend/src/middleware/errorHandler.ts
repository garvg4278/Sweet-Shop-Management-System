import { Request, Response, NextFunction } from "express";
import { DomainError } from "../errors/domain.error.js";

export function errorHandler(
    err: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    if (err instanceof DomainError) {
        return res.status(404).json({ message: err.message });
    }

    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
}
