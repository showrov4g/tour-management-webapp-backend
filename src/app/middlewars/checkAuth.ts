import { NextFunction, Request, Response } from "express";
import { envVars } from "../../config/env";
import AppError from "../errorClass/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/user/user.model";
import { StatusCodes } from "http-status-codes";
import { isActive } from "../modules/user/user.interface";

export const checkAuth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {

    try {
        const accessToken = req.headers.authorization
        if (!accessToken) {
            throw new AppError(403, "No access token found")
        }
        const verifiedToken = jwt.verify(accessToken, envVars.JWT_ACCESS_SECRET) as JwtPayload;
        const isUserExist = await User.findOne({ email: verifiedToken.email });
        if (!isUserExist) {
            throw new AppError(StatusCodes.BAD_REQUEST, "user doesn't exit")
        }
        if (isUserExist.isActive === isActive.BLOCKED || isUserExist.isActive === isActive.INACTIVE) {
            throw new AppError(StatusCodes.BAD_REQUEST, `User is ${isUserExist.isActive}`)
        }
        // if (isUserExist.isDeleted) {
        //     throw new AppError(StatusCodes.BAD_REQUEST, "Your account has been deleted")
        // }

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