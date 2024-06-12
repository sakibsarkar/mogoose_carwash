import express from "express";
import bookingRoutes from "../Modules/booking/booking.route";
import serviceRoutes from "../Modules/service/service.route";
import slotRoutes from "../Modules/slot/slot.route";
import slotRoutes2 from "../Modules/slot/slot.route2";
import userRoutes from "../Modules/user/user.route";
const router = express.Router();

const moduleRoute = [
  {
    path: "/auth",
    route: userRoutes,
  },
  {
    path: "/services",
    route: serviceRoutes,
  },
  {
    path: "/services",
    route: slotRoutes,
  },
  {
    path: "/slots",
    route: slotRoutes2,
  },
  {
    path: "/bookings",
    route: bookingRoutes,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
