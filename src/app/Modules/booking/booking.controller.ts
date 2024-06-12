import { isValidObjectId } from "mongoose";
import { catchAsyncError } from "../../../utils/catchAsyncError";
import sendResponse from "../../../utils/sendResponse";
import Service from "../service/service.model";
import Slot from "../slot/slot.model";
import { IBooking } from "./booking.interface";
import { bookingService } from "./booking.service";

const { createBookingService } = bookingService;

export const createBookingIntoDB = catchAsyncError(async (req, res, next) => {
  const x = {
    serviceId: "60d9c4e4f3b4b544b8b8d1c5",
    slotId: "60d9c4e4f3b4b544b8b8d1c6",
    vehicleType: "car",
    vehicleBrand: "Toyota",
    vehicleModel: "Camry",
    manufacturingYear: 2020,
    registrationPlate: "ABC123",
  };

  const { body } = req;

  const user = req.user;
  const isValidObjId = isValidObjectId(body.serviceId);
  if (!isValidObjId) {
    return sendResponse(res, {
      data: null,
      message: "invalid object id format",
      success: false,
      statusCode: 400,
    });
  }

  const isExist = await Service.findById(body.serviceId);
  if (!isExist) {
    return sendResponse(res, {
      message: "Service not found",
      data: null,
      statusCode: 404,
      success: false,
    });
  }
  const slot = await Slot.findById(body.slotId);
  if (!slot) {
    return sendResponse(res, {
      message: "slot not found",
      data: null,
      statusCode: 404,
      success: false,
    });
  }

  if (slot.isBooked !== "available") {
    sendResponse(res, {
      message: "this slot is not available for booking",
      data: null,
      statusCode: 404,
      success: false,
    });
  }

  const data: IBooking = {
    customer: user._id,
    service: body.serviceId,
    slot: body.slotId,
    ...body,
  };

  const result = await createBookingService(data);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Booking successful",
    data: result,
  });
});
