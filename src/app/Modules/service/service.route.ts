import { Router } from "express";
import { authorizeRoles, isAuthenticatedUser } from "../../middlewere/auth";
import { validSchema } from "../../middlewere/validator";
import {
  createServiceIntoDB,
  deleteServiceById,
  getAllServiceFromDB,
  getServiceById,
  updateServiceById,
} from "./service.controller";
import serviceValidationSchema from "./service.validation";
const router = Router();
router.post(
  "/",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  validSchema(serviceValidationSchema),
  createServiceIntoDB
);

router.get("/", getAllServiceFromDB);
router.get("/:id", getServiceById);
router.put(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateServiceById
);
router.delete(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteServiceById
);

const serviceRoutes = router;

export default serviceRoutes;
