"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingController = void 0;
const pick_1 = __importDefault(require("../../../shared/pick"));
const Booking_constant_1 = require("./Booking.constant");
const catchAsync_1 = require("../../../shared/catchAsync");
const Booking_service_1 = require("./Booking.service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const createBooking = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Booking_service_1.bookingService.createBooking(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Booking created successfully",
        data: result,
    });
}));
const getAllBookings = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, Booking_constant_1.bookingFilterableFields);
    const result = yield Booking_service_1.bookingService.getAllBookings(filters);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Bookings retrieved successfully",
        data: result,
    });
}));
const deleteBooking = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield Booking_service_1.bookingService.deleteBooking(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Booking Deleted SuccessFully",
        data: result,
    });
}));
exports.bookingController = {
    createBooking,
    getAllBookings,
    deleteBooking,
};
