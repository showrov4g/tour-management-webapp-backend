import { NextFunction, Request, Response, Router } from "express";
import { UserControllers } from "./user.controller";
import z from "zod";



const router = Router();
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

router.post("/register", (req: Request, res: Response, next: NextFunction) => {
    const createUserZodSchema = z.object({
        name: z.string({invalid_type_error: "name must be string"}).min(2,{message: "Name is too short"}).max(50, {message: "Name is too big"}),
        user: z.string(),
        email: z.string().email(),
        password?: z.string().min(8).regex(passwordRegex,{message: "Password must include uppercase, lowercase, number, and special character"}),
        phone?: z.string(),
        picture?: z.string(),
        address?: z.string(),
        isDeleted?: z.string(),
        isActive?: z.isActive(),
        isVerified?: z.string(),
        role: "USER" | "ADMIN" | "GUIDE";
        auth: IAuthProvider[];
        bookings?: Types.ObjectId[];
        guides?: Types.ObjectId[];
    })
}, UserControllers.createUser);
router.get("/all-users", UserControllers.getAllUser)


export const UserRoutes = router;