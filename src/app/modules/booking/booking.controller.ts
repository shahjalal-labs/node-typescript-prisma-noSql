import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { BookingService } from "./booking.service";
import sendResponse from "../../../shared/sendResponse";

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const bookings = await BookingService.getAllBookingsFromDB();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "bookings retrived successfully",
    data: bookings,
  });
});

export const BookingController = {
  getAllBookings,
};
