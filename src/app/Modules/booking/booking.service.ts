import Slot from "../slot/slot.model";
import { IBooking } from "./booking.interface";
import Booking from "./booking.model";

const createBookingService = async (payload: IBooking) => {
  const create = await Booking.create(payload);

  const update = await Slot.findByIdAndUpdate(payload.slot, {
    isBooked: "booked",
  });

  const result = await Booking.findById(create._id)
    .populate("service")
    .populate("slot")
    .populate("customer");

  return result;
};

export const bookingService = { createBookingService };
