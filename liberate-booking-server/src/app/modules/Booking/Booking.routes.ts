import express from "express";

import { bookingController } from "./Booking.controller";

const router = express.Router();

router.post("/", bookingController.createBooking);

router.get("/", bookingController.getAllBookings);
router.delete("/:id", bookingController.deleteBooking);

export const BookingRoutes = router;
