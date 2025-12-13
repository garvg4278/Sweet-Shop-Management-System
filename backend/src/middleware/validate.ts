import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export function validate(schema: ZodSchema, source: "body" | "query" = "body") {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = source === "body" ? req.body : req.query;

    const result = schema.safeParse(data);

    if (!result.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: result.error.flatten(),
      });
    }

    // Replace with parsed & coerced values
    if (source === "body") req.body = result.data;
    else req.query = result.data as any;

    next();
  };
}
