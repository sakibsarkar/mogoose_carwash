import express from "express";
import serviceRoutes from "../Modules/service/service.route";
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
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
