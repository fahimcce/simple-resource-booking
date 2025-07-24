import { Booking, Prisma } from "@prisma/client";

import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";
import prisma from "../../../shared/prisma";
import { TBooking, TBookingFilter } from "./Booking.interface";
import { BUFFER_MINUTES, MAX_DURATION_MINUTES } from "./Booking.constant";

const createBooking = async (payload: TBooking) => {
  const { resource, requestedBy, startTime, endTime } = payload;

  const start = new Date(startTime);
  const end = new Date(endTime);

  if (end <= start) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "End time must be greater than start time."
    );
  }

  const duration = (end.getTime() - start.getTime()) / (1000 * 60); // in minutes

  if (duration < 15) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Booking must be at least 15 minutes."
    );
  }

  if (duration > MAX_DURATION_MINUTES) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Booking cannot exceed 2 hours."
    );
  }

  const bufferStart = new Date(start.getTime() - BUFFER_MINUTES * 60 * 1000);
  const bufferEnd = new Date(end.getTime() + BUFFER_MINUTES * 60 * 1000);

  const conflict = await prisma.booking.findFirst({
    where: {
      resource,
      startTime: {
        lt: bufferEnd,
      },
      endTime: {
        gt: bufferStart,
      },
    },
  });

  if (conflict) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Booking time conflicts with existing booking (including buffer time)."
    );
  }

  const result = await prisma.booking.create({
    data: {
      resource,
      requestedBy,
      startTime,
      endTime,
    },
  });

  return result;
};

const getAllBookings = async (filters: TBookingFilter): Promise<Booking[]> => {
  const whereClause: Prisma.BookingWhereInput = {};

  if (filters.resource) {
    whereClause.resource = filters.resource;
  }

  if (filters.date) {
    const dateStart = new Date(filters.date);
    const dateEnd = new Date(filters.date);
    dateEnd.setDate(dateEnd.getDate() + 1);

    whereClause.startTime = {
      gte: dateStart,
      lt: dateEnd,
    };
  }

  const result = await prisma.booking.findMany({
    where: whereClause,
    orderBy: {
      startTime: "asc",
    },
  });

  return result;
};

const deleteBooking = async (id: string) => {
  const result = await prisma.booking.delete({
    where: { id },
  });
  return result;
};

export const bookingService = {
  createBooking,
  getAllBookings,
  deleteBooking,
};
