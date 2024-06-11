import { catchAsyncError } from "../../../utils/catchAsyncError";
import sendResponse from "../../../utils/sendResponse";
import Service from "../service/service.model";
import slotService from "./slot.service";

const { createSlot } = slotService;

export const createSlotsIntoDB = catchAsyncError(async (req, res) => {
  const { body } = req;

  const isServiceExist = await Service.findById(body.service);
  console.log(isServiceExist);

  if (!isServiceExist) {
    return sendResponse(res, {
      success: false,
      statusCode: 404,
      message: "There is no available Service on this id. invalid service id",
      data: null,
    });
  }

  const result = await createSlot(body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Slots created successfully",
    data: result,
  });
});
