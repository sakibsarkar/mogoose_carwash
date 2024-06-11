import { isValidObjectId } from "mongoose";
import { catchAsyncError } from "../../../utils/catchAsyncError";
import sendResponse from "../../../utils/sendResponse";
import servicesService from "./service.service";

const { createService, getSingleService } = servicesService;

export const createServiceIntoDB = catchAsyncError(async (req, res, next) => {
  const { body } = req;
  const result = await createService(body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Service created successfully",
    data: result,
  });
});

export const getServiceById = catchAsyncError(async (req, res) => {
  const id = req.params.id;
  const isValidId = isValidObjectId(id);
  if (!isValidId) {
    return sendResponse(res, {
      message: "Invalid object id",
      data: null,
      statusCode: 400,
      success: false,
    });
  }

  const result = await getSingleService(id);
  if (!result) {
    sendResponse(res, {
      message: "No data found",
      data: null,
      success: false,
      statusCode: 404,
    });
  }

  sendResponse(res, {
    data: result,
    success: true,
    statusCode: 200,
    message: "Service retrieved successfully",
  });
});
