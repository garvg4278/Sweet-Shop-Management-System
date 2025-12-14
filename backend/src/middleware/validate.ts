import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.parse(req.body); // ✅ read body
    req.body = parsed;                     // ✅ overwrite with validated data
    next();
  };
