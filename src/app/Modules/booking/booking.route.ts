import { Router } from "express";
import { authorizeRoles, isAuthenticatedUser } from "../../middlewere/auth";
import { createBookingIntoDB, getAllBookings } from "./booking.controller";

const router = Router();
router.post(
  "/",
  isAuthenticatedUser,
  authorizeRoles("user"),
  createBookingIntoDB
);
router.get("/", isAuthenticatedUser, authorizeRoles("user"), getAllBookings);

const bookingRoutes = router;
export default bookingRoutes;
