import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { createUserZodSchema } from "../modules/user/user.validation";

export const validateRequest = (zodSchema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body = await createUserZodSchema.parseAsync(req.body);
        next()
    } catch (error) {
        next(error)
    }
}
