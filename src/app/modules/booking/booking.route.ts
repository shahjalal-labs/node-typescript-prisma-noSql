import express from "express";
import { BookingController } from "./booking.controller";
import { BookingValidation } from "./booking.validation";
import validateRequest from "../../middlewares/validateRequest";
const router = express.Router();

router.get("/", BookingController.getAllBookings);
router.post(
  "/",
  validateRequest(BookingValidation.createBookingValidationSchema),
  BookingController.createBooking,
);
export const bookingRoutes = router;
