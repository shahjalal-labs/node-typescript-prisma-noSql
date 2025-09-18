import { Booking } from "@prisma/client";
import prisma from "../../../shared/prisma";

const createBookingIntoDB = async (payload: Booking) => {
  const booking = await prisma.booking.create({
    data: payload,
  });
  return booking;
};

const getAllBookingsFromDB = async () => {
  const bookings = await prisma.booking.findMany({
    include: {
      product: {
        select: {
          description: true,
          id: true,
          price: true,
        },
      },
      user: {
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      },
    },
  });
  return bookings;
};

const getSingleBookingFromDB = async () => {
  // const bookingDetails=await prisma.booking. ;
};

export const BookingService = {
  getAllBookingsFromDB,
  createBookingIntoDB,
};
