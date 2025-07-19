import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
import { isActive, IUser } from "../modules/user/user.interface";
import { generateToken, verifyToken } from "./jwt";
import { User } from "../modules/user/user.model";
import AppError from "../errorClass/AppError";
import { StatusCodes } from "http-status-codes";

export const createUserToken = (user: Partial<IUser>) => {



    const jwtPayload = {
        userId: user._id,
        email: user.email,
        role: user.role,

    }

    // jwt implement 
    const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES)
    // refresh token 

    const refreshToken = generateToken(jwtPayload, envVars.JWT_REFRESH_SECRET, envVars.JWT_REFRESH_EXPIRES)

    return {
        accessToken,
        refreshToken
    }
}

export const createNewAccessTokenWithRefreshToken = async (refreshToken: srting) => {
    const verifiedRefreshedToken = verifyToken(refreshToken, envVars.JWT_REFRESH_SECRET) as JwtPayload;

    const isUserExist = await User.findOne({ email: verifiedRefreshedToken.email });
    if (!isUserExist) {
        throw new AppError(StatusCodes.BAD_REQUEST, "user doesn't exit")
    }
    if (isUserExist.isActive === isActive.BLOCKED || isUserExist.isActive === isActive.INACTIVE) {
        throw new AppError(StatusCodes.BAD_REQUEST, `User is ${isUserExist.isActive}`)
    }
    if (isUserExist.isDeleted) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Your account has been deleted")
    }
    const jwtPayload = {
        userId: isUserExist._id,
        email: isUserExist.email,
        role: isUserExist.role,

    }

    // jwt implement 
    const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES)
    // refresh token 
    return;
}