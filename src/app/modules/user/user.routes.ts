import { NextFunction, Request, Response, Router } from "express";
import { UserControllers } from "./user.controller";
import { createUserZodSchema } from "./user.validation";
import { AnyZodObject, ZodObject } from "zod";
import { validateRequest } from "../../middlewars/validate";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorClass/AppError";
import { Role } from "./user.interface";

const router = Router();

// function 

router.post("/register", validateRequest(createUserZodSchema), UserControllers.createUser);


router.get("/all-users", async (req: Request, res: Response, next: NextFunction) => {

    try {
        const accessToken = req.headers.authorization
        if (!accessToken) {
            throw new AppError(403, "No access token found")
        }
        const verifiedToken = jwt.verify(accessToken, "ghosh");

        // if (!verifiedToken) {
        //     throw new AppError(403, `you are not authorize ${verifiedToken}`)
        // }

        if ((verifiedToken as JwtPayload).role as string !== Role.ADMIN) {
            throw new AppError(403, "you are not allow to visit this page")
        }

        console.log(verifiedToken);

        next();

    } catch (error) {
        console.log("jwt error", error)
        next(error)
    }


}, UserControllers.getAllUser)


export const UserRoutes = router;