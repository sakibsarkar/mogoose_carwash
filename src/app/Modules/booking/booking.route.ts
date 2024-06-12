import { Router } from "express";
import { authorizeRoles, isAuthenticatedUser } from "../../middlewere/auth";
import { createBookingIntoDB } from "./booking.controller";

const router = Router();
router.post(
  "/",
  isAuthenticatedUser,
  authorizeRoles("user"),
  createBookingIntoDB
);

const bookingRoutes = router;
export default bookingRoutes;
