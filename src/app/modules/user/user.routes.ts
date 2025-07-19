import { NextFunction, Request, Response, Router } from "express";
import { UserControllers } from "./user.controller";
import { createUserZodSchema } from "./user.validation";
import { AnyZodObject, ZodObject } from "zod";
import { validateRequest } from "../../middlewars/validate";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorClass/AppError";
import { Role } from "./user.interface";
import { envVars } from "../../../config/env";
import { checkAuth } from "../../middlewars/checkAuth";

const router = Router();





// function 

router.post("/register", validateRequest(createUserZodSchema), UserControllers.createUser);
router.get("/all-users", checkAuth(Role.ADMIN, Role.SUPPER_ADMIN), UserControllers.getAllUser);
router.patch("/:id", checkAuth(...Object.values(Role)), UserControllers.updateUser);


export const UserRoutes = router;