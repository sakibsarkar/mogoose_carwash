import { isValidObjectId } from "mongoose";
import { catchAsyncError } from "../../../utils/catchAsyncError";
import sendResponse from "../../../utils/sendResponse";
import Service from "./service.model";
import servicesService from "./service.service";

const {
  createService,
  getSingleService,
  getAllServices,
  updateSingleService,
  deleteSingleService,
} = servicesService;

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

export const getAllServiceFromDB = catchAsyncError(async (req, res, next) => {
  const result = await getAllServices();
  if (result.length > 0) {
    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Services retrieved successfully",
      data: result,
    });
  }
  sendResponse(res, {
    success: false,
    statusCode: 404,
    message: "No Data Found",
    data: [],
  });
});

export const updateServiceById = catchAsyncError(async (req, res) => {
  const id = req.params.id;
  const { body } = req;
  const isValidId = isValidObjectId(id);
  if (!isValidId) {
    return sendResponse(res, {
      message: "Invalid object id",
      data: null,
      statusCode: 400,
      success: false,
    });
  }
  const isExist = Service.findById(id);
  if (!isExist) {
    return sendResponse(res, {
      message: "Service not found",
      data: null,
      statusCode: 404,
      success: false,
    });
  }

  const result = await updateSingleService(id, body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Service updated successfully",
    data: result,
  });
});
export const deleteServiceById = catchAsyncError(async (req, res) => {
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
  const isExist = Service.findById(id);
  if (!isExist) {
    return sendResponse(res, {
      message: "Service not found",
      data: null,
      statusCode: 404,
      success: false,
    });
  }

  const result = await deleteSingleService(id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Service updated successfully",
    data: result,
  });
});
