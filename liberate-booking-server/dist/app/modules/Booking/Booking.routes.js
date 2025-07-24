"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const Booking_controller_1 = require("./Booking.controller");
const router = express_1.default.Router();
router.post("/", Booking_controller_1.bookingController.createBooking);
router.get("/", Booking_controller_1.bookingController.getAllBookings);
router.delete("/:id", Booking_controller_1.bookingController.deleteBooking);
exports.BookingRoutes = router;
