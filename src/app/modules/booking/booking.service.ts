import prisma from "../../../shared/prisma";

const getAllBookingsFromDB = async () => {
  const bookings = await prisma.booking.findMany();
  return bookings;
};

export const BookingService = {
  getAllBookingsFromDB,
};
