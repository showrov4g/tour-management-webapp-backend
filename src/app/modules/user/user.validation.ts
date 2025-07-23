import z from "zod";
import { isActive, Role } from "./user.interface";
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const createUserZodSchema = z.object({
    name: z.string({ invalid_type_error: "name must be string" })
        .min(2, { message: "Name is too short" })
        .max(50, { message: "Name is too big" }),
    // user: z.string(),
    email: z.string().email()
        .min(5, { message: "email must be at last 5 character " })
        .max(20, { message: "email not more than 20 character" }),
    password : z.string()
        .min(8)
        .regex(passwordRegex, { message: "Password must include uppercase, lowercase, number, and special character" }),
    phone: z.string({ invalid_type_error: "number must be string" })
        .regex(/^(?:\+88|88)?01[3-9]\d{8}$/, { message: "phone number must be in Bangladeshi Standard" }),
    address: z.string({ invalid_type_error: "Address must be string" }).max(200, { message: "address must be under 200 character" }).optional(),
        isActive: z.enum(Object.values(isActive)as [string]).optional(),
    isDeleted: z.boolean({invalid_type_error: "isDeleted must be true or false"}).optional(),
    isVerified: z.boolean({invalid_type_error: "isVerified must be true or false"}).optional(),

});

export const updateUserZodSchema = z.object({
    name: z.string({ invalid_type_error: "name must be string" })
        .min(2, { message: "Name is too short" })
        .max(50, { message: "Name is too big" }).optional(),
    user: z.string(),
    password: z.string()
        .min(8)
        .regex(passwordRegex, { message: "Password must include uppercase, lowercase, number, and special character" }).optional(),
    phone: z.string({ invalid_type_error: "number must be string" })
        .regex(/^(?:\+88|88)?01[3-9]\d{8}$/, { message: "phone number must be in Bangladeshi Standard" }).optional(),
    address: z.string({ invalid_type_error: "Address must be string" }).max(200, { message: "address must be under 200 character" }).optional(),
    role: z.enum(Object.keys(Role)as[string]).optional(),
    isActive: z.enum(Object.values(isActive)as [string]).optional(),
    isDeleted: z.boolean({invalid_type_error: "isDeleted must be true or false"}).optional(),
    isVerified: z.boolean({invalid_type_error: "isVerified must be true or false"}).optional(),

});