import { NextFunction, Request, Response } from "express";
import { envVars } from "../../config/env";
import AppError from "../errorClass/AppError";
import  jwt, { JwtPayload }  from "jsonwebtoken";

export const checkAuth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {

    try {
        const accessToken = req.headers.authorization
        if (!accessToken) {
            throw new AppError(403, "No access token found")
        }
        const verifiedToken = jwt.verify(accessToken, envVars.JWT_ACCESS_SECRET)as JwtPayload;


        if (!authRoles.includes(verifiedToken.role)) {
            throw new AppError(403, "you are not allow to visit this page")
        }

        req.user = verifiedToken
        next();

    } catch (error) {
        console.log("jwt error", error)
        next(error)
    }


}