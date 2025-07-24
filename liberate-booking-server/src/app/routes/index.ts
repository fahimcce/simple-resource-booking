import express from "express";
import { BookingRoutes } from "../modules/Booking/Booking.routes";
const router = express.Router();

const moduleRoutes = [
  {
    path: "/bookings",
    route: BookingRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
