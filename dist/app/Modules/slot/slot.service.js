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
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const slot_model_1 = __importDefault(require("./slot.model"));
const slot_utils_1 = require("./slot.utils");
const createSlot = (payload, duration) => __awaiter(void 0, void 0, void 0, function* () {
    // {
    //     "service": "60d9c4e4f3b4b544b8b8d1c5",
    //     "date": "2024-06-15",
    //     "startTime": "09:00",
    //     "endTime": "14:00"
    // }
    const startMinutes = (0, slot_utils_1.timeToMinutes)(payload.startTime);
    const endMinutes = (0, slot_utils_1.timeToMinutes)(payload.endTime);
    const totalDuration = endMinutes - startMinutes;
    const numberOfSlots = totalDuration / duration;
    const slots = [];
    let start = startMinutes;
    for (let i = 0; i < numberOfSlots; i++) {
        const end = start + duration;
        slots.push({
            service: payload.service,
            date: payload.date,
            startTime: (0, slot_utils_1.minutesToTime)(start),
            endTime: (0, slot_utils_1.minutesToTime)(end),
            isBooked: "available",
        });
        start = end;
    }
    const result = yield slot_model_1.default.create(slots);
    return result;
});
const getAllAvailableSlotsService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const find = slot_model_1.default.find({ isBooked: "available" }).populate("service");
    const queryBuilder = new QueryBuilder_1.default(find, query).filter();
    const result = yield queryBuilder.modelQuery;
    return result;
});
const slotService = {
    createSlot,
    getAllAvailableSlotsService,
};
exports.default = slotService;
