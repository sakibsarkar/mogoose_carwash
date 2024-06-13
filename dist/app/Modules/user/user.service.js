"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwtToken_1 = __importDefault(require("../../../utils/jwtToken"));
const user_model_1 = require("./user.model");
const user_utils_1 = require("./user.utils");
const createUserService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(payload);
    return result;
});
const logInUserService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExistsByEmail(payload.email);
    if (!user) {
        return { notfound: true };
    }
    const plainPassword = payload.password;
    const hashedPassword = user.password;
    const isMatched = yield (0, user_utils_1.isPasswordMatched)(plainPassword, hashedPassword);
    if (!isMatched) {
        return { matched: false };
    }
    const tokenObj = { email: user.email, role: user.role };
    const token = (0, jwtToken_1.default)(tokenObj, "7d");
    return { token, user };
});
const userService = {
    createUserService,
    logInUserService,
};
exports.default = userService;
