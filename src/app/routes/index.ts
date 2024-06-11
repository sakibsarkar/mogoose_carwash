import express from "express";
import serviceRoutes from "../Modules/service/service.route";
import slotRoutes from "../Modules/slot/slot.route";
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
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
