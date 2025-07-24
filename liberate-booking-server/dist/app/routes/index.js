"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Booking_routes_1 = require("../modules/Booking/Booking.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/bookings",
        route: Booking_routes_1.BookingRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
