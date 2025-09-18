import { Booking } from "@prisma/client";
import prisma from "../../../shared/prisma";

const createBookingIntoDB = async (payload: Booking) => {
  const booking = await prisma.booking.create({
    data: payload,
  });
  return booking;
};

const getAllBookingsFromDB = async () => {
  const bookings = await prisma.booking.findMany();
  return bookings;
};

export const BookingService = {
  getAllBookingsFromDB,
  createBookingIntoDB,
};
