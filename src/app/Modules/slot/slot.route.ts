import { Router } from "express";
import { authorizeRoles, isAuthenticatedUser } from "../../middlewere/auth";
import { createSlotsIntoDB } from "./slot.controller";

const router = Router();
router.post(
  "/slots",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  createSlotsIntoDB
);
const slotRoutes = router;
export default slotRoutes;
