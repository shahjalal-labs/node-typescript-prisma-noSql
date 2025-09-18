import { z } from "zod";

const createBookingValidationSchema = z.object({
  productId: z.string(),
  userId: z.string(),
});

export const BookingValidation = {
  createBookingValidationSchema,
};
