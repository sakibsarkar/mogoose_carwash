import { Router } from "express";
import { getAllAvailableSlots } from "./slot.controller";
// "/slot/{pathname}"
const router = Router();
router.get("/availability", getAllAvailableSlots);
const slotRoutes2 = router;
export default slotRoutes2;
