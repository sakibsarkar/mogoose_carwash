"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidationSchema = exports.userValidationSchema = void 0;
const zod_1 = require("zod");
exports.userValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: "Name is required" }).trim(),
    email: zod_1.z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Invalid email format" })
        .trim()
        .toLowerCase(),
    password: zod_1.z
        .string()
        .min(6, { message: "Password must be at least 6 characters long" }),
    phone: zod_1.z.string({ message: "Phone numer is require-String" }),
    role: zod_1.z.enum(["admin", "user"]),
    address: zod_1.z.string().min(1, { message: "Address is required" }),
});
exports.loginValidationSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Invalid email format" })
        .trim()
        .toLowerCase(),
    password: zod_1.z
        .string()
        .min(6, { message: "Password must be at least 6 characters long" }),
});
