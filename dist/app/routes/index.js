"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booking_route_1 = __importDefault(require("../Modules/booking/booking.route"));
const booking_route2_1 = __importDefault(require("../Modules/booking/booking.route2"));
const service_route_1 = __importDefault(require("../Modules/service/service.route"));
const slot_route_1 = __importDefault(require("../Modules/slot/slot.route"));
const slot_route2_1 = __importDefault(require("../Modules/slot/slot.route2"));
const user_route_1 = __importDefault(require("../Modules/user/user.route"));
const router = express_1.default.Router();
const moduleRoute = [
    {
        path: "/auth",
        route: user_route_1.default,
    },
    {
        path: "/services",
        route: service_route_1.default,
    },
    {
        path: "/services",
        route: slot_route_1.default,
    },
    {
        path: "/slots",
        route: slot_route2_1.default,
    },
    {
        path: "/bookings",
        route: booking_route_1.default,
    },
    {
        path: "/",
        route: booking_route2_1.default,
    },
];
moduleRoute.forEach((route) => router.use(route.path, route.route));
exports.default = router;
