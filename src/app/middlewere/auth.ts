import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { catchAsyncError } from "../../utils/catchAsyncError";
import { User } from "../Modules/user/user.model";
import Config from "../config";

export const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const getToken = req.header("Authorization");

  if (!getToken)
    return res.status(400).json({ msg: "Invalid Authentication." });

  const token = getToken.split(" ")[1];
  const decoded: any = jwt.verify(token, Config.jwt_access_secret as string);

  if (!decoded) return res.status(400).json({ msg: "Invalid Authentication." });

  const user = await User.findOne({ email: decoded?.email }).select(
    "-password"
  );
  if (!user) return res.status(400).json({ msg: "User does not exist." });

  req.user = user;

  next();
});

export const authorizeRoles = (...roles: any) => {
  return (req: any, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role)) {
      return res.json({
        success: false,
        statusCode: 401,
        message: "You have no access to this route",
      });
    }
    next();
  };
};
