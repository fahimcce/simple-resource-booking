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
exports.bookingService = void 0;
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const Booking_constant_1 = require("./Booking.constant");
const createBooking = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { resource, requestedBy, startTime, endTime } = payload;
    const start = new Date(startTime);
    const end = new Date(endTime);
    if (end <= start) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "End time must be greater than start time.");
    }
    const duration = (end.getTime() - start.getTime()) / (1000 * 60); // in minutes
    if (duration < 15) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Booking must be at least 15 minutes.");
    }
    if (duration > Booking_constant_1.MAX_DURATION_MINUTES) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Booking cannot exceed 2 hours.");
    }
    const bufferStart = new Date(start.getTime() - Booking_constant_1.BUFFER_MINUTES * 60 * 1000);
    const bufferEnd = new Date(end.getTime() + Booking_constant_1.BUFFER_MINUTES * 60 * 1000);
    const conflict = yield prisma_1.default.booking.findFirst({
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
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Booking time conflicts with existing booking (including buffer time).");
    }
    const result = yield prisma_1.default.booking.create({
        data: {
            resource,
            requestedBy,
            startTime,
            endTime,
        },
    });
    return result;
});
const getAllBookings = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const whereClause = {};
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
    const result = yield prisma_1.default.booking.findMany({
        where: whereClause,
        orderBy: {
            startTime: "asc",
        },
    });
    return result;
});
const deleteBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.booking.delete({
        where: { id },
    });
    return result;
});
exports.bookingService = {
    createBooking,
    getAllBookings,
    deleteBooking,
};
