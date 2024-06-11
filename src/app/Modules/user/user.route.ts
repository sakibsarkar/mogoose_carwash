import { Router } from "express";
import { validSchema } from "../../middlewere/validator";
import { createUserIntoDB, logInUser } from "./user.controller";
import { loginValidationSchema, userValidationSchema } from "./user.validation";
const router = Router();
router.post("/signup", validSchema(userValidationSchema), createUserIntoDB);
router.post("/login", validSchema(loginValidationSchema), logInUser);

const userRoutes = router;
export default userRoutes;
