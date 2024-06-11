import { Router } from "express";
import { authorizeRoles, isAuthenticatedUser } from "../../middlewere/auth";
import { validSchema } from "../../middlewere/validator";
import { createServiceIntoDB, getServiceById } from "./service.controller";
import serviceValidationSchema from "./service.validation";
const router = Router();
router.post(
  "/",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  validSchema(serviceValidationSchema),
  createServiceIntoDB
);

router.get("/:id", getServiceById);

const serviceRoutes = router;

export default serviceRoutes;
