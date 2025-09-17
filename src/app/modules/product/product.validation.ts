//
import * as z from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.number().int().positive("Price must be a positive number"),
  description: z.string().min(1, "Description is required"),
  sellerId: z.string(),
});

export const ProductSchemaValidation = {
  createProductSchema,
};

