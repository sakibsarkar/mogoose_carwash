import ISlot from "./slot.interface";
import Slot from "./slot.model";
import { minutesToTime, timeToMinutes } from "./slot.utils";

const createSlot = async (payload: ISlot) => {
  // {
  //     "service": "60d9c4e4f3b4b544b8b8d1c5",
  //     "date": "2024-06-15",
  //     "startTime": "09:00",
  //     "endTime": "14:00"
  // }

  const duration = 60;

  const startMinutes = timeToMinutes(payload.startTime);
  const endMinutes = timeToMinutes(payload.endTime);

  const totalDuration = endMinutes - startMinutes;
  const numberOfSlots = totalDuration / duration;

  const slots = [];
  let start = startMinutes;
  for (let i = 0; i < numberOfSlots; i++) {
    const end = start + duration;
    slots.push({
      service: payload.service,
      date: payload.date,
      startTime: minutesToTime(start),
      endTime: minutesToTime(end),
      isBooked: "available",
    });
    start = end;
  }

  const result = await Slot.create(slots);
  return result;
};

const slotService = {
  createSlot,
};

export default slotService;
