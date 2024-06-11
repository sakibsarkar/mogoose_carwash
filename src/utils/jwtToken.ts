import jwt from "jsonwebtoken";
import Config from "../app/config";

const createToken = (user: object, expires: string) => {
  return jwt.sign(user, Config.jwt_access_secret as string, {
    expiresIn: expires,
  });
};

export default createToken;
