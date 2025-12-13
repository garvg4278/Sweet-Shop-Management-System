import { z } from "zod";

export const inventorySchema = z.object({
  quantity: z.number().int().positive(),
});

export type InventoryInput = z.infer<typeof inventorySchema>;
