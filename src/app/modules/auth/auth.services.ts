import { StatusCodes } from "http-status-codes";
import { isActive, IUser } from "../user/user.interface"
import AppError from "../../errorClass/AppError";
import { User } from "../user/user.model";
import bcryptjs from "bcryptjs"
import jwt, { JwtPayload } from "jsonwebtoken";
import { generateToken, verifyToken } from "../../utils/jwt";
import { envVars } from "../../../config/env";
import { createUserToken } from "../../utils/userToken";

const credentialLogin = async (payload: Partial<IUser>) => {
    const { email, password } = payload;
    const isUserExist = await User.findOne({ email });
    if (!isUserExist) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Email not found")
    }

    const isPasswordMatch = await bcryptjs.compare(password as string, isUserExist.password as string);

    if (!isPasswordMatch) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Incorrect password")
    }

    // const jwtPayload = {
    //     userId: isUserExist._id,
    //     email : isUserExist.email,
    //     role: isUserExist.role,

    // }

    // // jwt implement 
    // const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES)
    // // refresh token 

    // const refreshToken = generateToken(jwtPayload, envVars.JWT_REFRESH_SECRET, envVars.JWT_REFRESH_EXPIRES)

    const usersToken = createUserToken(isUserExist)

    // const accessToken = jwt.sign(jwtPayload, "ghosh",{
    //     expiresIn: "1d"
    // })

    // delete isUserExist.password;
    const { password: pass, ...rest } = isUserExist.toObject();

    return {
        accessToken: usersToken.accessToken,
        refreshToken: usersToken.refreshToken,
        user: rest
    }


}
const getNewAccessToken = async (refreshToken: string) => {
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
        email : isUserExist.email,
        role: isUserExist.role,

    }

    // jwt implement 
    const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES)
    // refresh token 


    return {
        accessToken
    }


}


export const authServices = {
    credentialLogin,
    getNewAccessToken
}