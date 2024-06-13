"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../middlewere/auth");
const slot_controller_1 = require("./slot.controller");
const router = (0, express_1.Router)();
router.post("/slots", auth_1.isAuthenticatedUser, (0, auth_1.authorizeRoles)("admin"), slot_controller_1.createSlotsIntoDB);
const slotRoutes = router;
exports.default = slotRoutes;
