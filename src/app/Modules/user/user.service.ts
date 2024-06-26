import createToken from "../../../utils/jwtToken";
import IUser from "./user.interface";
import { User } from "./user.model";
import { isPasswordMatched } from "./user.utils";

const createUserService = async (payload: IUser) => {
  const result = await User.create(payload);
  const resultObj = result.toObject();
  const { password, ...rest } = resultObj;
  return rest;
};

const logInUserService = async (payload: Partial<IUser>) => {
  const user = await User.isUserExistsByEmail(payload.email as string);

  if (!user) {
    return { notfound: true };
  }

  const plainPassword = payload.password as string;
  const hashedPassword = user.password;
  const isMatched = await isPasswordMatched(plainPassword, hashedPassword);
  if (!isMatched) {
    return { matched: false };
  }

  const tokenObj = { email: user.email, role: user.role };
  const token = createToken(tokenObj, "7d");
  const { address, email, name, phone, role } = user;
  const usreRes = await User.findOne({ email: user.email });
  return { token, user: usreRes };
};

const userService = {
  createUserService,
  logInUserService,
};
export default userService;
