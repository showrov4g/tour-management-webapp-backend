import { NextFunction, Request, Response, Router } from "express";
import { UserControllers } from "./user.controller";
import { createUserZodSchema } from "./user.validation";
import { AnyZodObject, ZodObject } from "zod";
import { validateRequest } from "../../middlewars/validate";


const router = Router();

// function 




router.post("/register", validateRequest(createUserZodSchema), UserControllers.createUser);


router.get("/all-users",(req:Request, res:Response, next: NextFunction)=>{} ,UserControllers.getAllUser)


export const UserRoutes = router;