import { StatusCodes } from "http-status-codes";
import AppError from "../../errorClass/AppError";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import bcryptjs from "bcryptjs"
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../../config/env";



const createUser = async (payload: Partial<IUser>) => {
    const { email, password, ...rest } = payload;

    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
        throw new AppError(StatusCodes.BAD_REQUEST, "user Already exit")
    }

    const hashedPassword = await bcryptjs.hash(password as string, 10);


    const authProvider: IAuthProvider = { provider: "credential", providerId: email as string }


    const user = await User.create({

        email,
        password: hashedPassword,
        auth: [authProvider],
        ...rest
    });
    return user;
}

const updateUser = async (userId: string, payload: Partial<IUser>, decodedToken: JwtPayload) => {
    if (payload.role) {
        if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
            throw new AppError(StatusCodes.FORBIDDEN, "You are not able to change this data")
        }
        if (payload.role === Role.SUPPER_ADMIN && decodedToken.role === Role.ADMIN) {
            throw new AppError(StatusCodes.FORBIDDEN, "You are not able to change this data")
        }
    }
    if (payload.isActive || payload.isDeleted || payload.isVerified) {
        if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
            throw new AppError(StatusCodes.FORBIDDEN, "You are not able to change this data")
        }
    }
    if (payload.password) {
        payload.password = await bcryptjs.hash(payload.password, envVars.BCRYPT_SOLT_ROUND);
    }
}



// all user data getting api making
const getAllUser = async () => {
    const users = await User.find()

    const totalUser = await User.countDocuments()

    return {
        data: users,
        meta: {
            total: totalUser
        }
    };
}


export const UserServices = {
    createUser,
    getAllUser
}