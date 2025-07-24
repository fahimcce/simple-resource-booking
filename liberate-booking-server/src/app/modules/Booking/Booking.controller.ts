import { Request, Response } from "express";

import pick from "../../../shared/pick";
import { bookingFilterableFields } from "./Booking.constant";
import { catchAsync } from "../../../shared/catchAsync";
import { bookingService } from "./Booking.service";
import sendResponse from "../../../shared/sendResponse";

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await bookingService.createBooking(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Booking created successfully",
    data: result,
  });
});

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookingFilterableFields);
  const result = await bookingService.getAllBookings(filters);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Bookings retrieved successfully",
    data: result,
  });
});

const deleteBooking = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await bookingService.deleteBooking(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Booking Deleted SuccessFully",
    data: result,
  });
});

export const bookingController = {
  createBooking,
  getAllBookings,
  deleteBooking,
};
