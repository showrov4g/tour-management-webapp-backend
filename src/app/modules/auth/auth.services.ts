import { StatusCodes } from "http-status-codes";
import { IUser } from "../user/user.interface"
import AppError from "../../errorClass/AppError";
import { User } from "../user/user.model";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken";
import { generateToken } from "../../utils/jwt";
import { envVars } from "../../../config/env";

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

    const jwtPayload = {
        userId: isUserExist._id,
        email : isUserExist.email,
        role: isUserExist.role,

    }

    // jwt implement 
    const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES)


    // const accessToken = jwt.sign(jwtPayload, "ghosh",{
    //     expiresIn: "1d"
    // })



    return {
        accessToken
    }


}


export const authServices = {
    credentialLogin
}