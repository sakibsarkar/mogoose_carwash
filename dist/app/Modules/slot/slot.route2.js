"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const slot_controller_1 = require("./slot.controller");
// "/slot/{pathname}"
const router = (0, express_1.Router)();
router.get("/availability", slot_controller_1.getAllAvailableSlots);
const slotRoutes2 = router;
exports.default = slotRoutes2;
