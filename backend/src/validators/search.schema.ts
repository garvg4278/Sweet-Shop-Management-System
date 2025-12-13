import { z } from "zod";

export const searchSweetSchema = z.object({
    name: z.string().optional(),
    category: z.string().optional(),
    minPrice: z.coerce.number().optional(),
    maxPrice: z.coerce.number().optional(),
});
