export type BookingStatus = "UPCOMING" | "ONGOING" | "PAST";

export interface TBooking {
  resource: string;
  requestedBy: string;
  startTime: string;
  endTime: string;
}

export interface TBookingFilter {
  resource?: string;
  date?: string;
}
