import { StatusCodes } from "http-status-codes";
import AppError from "../../errorClass/AppError";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import bcryptjs from "bcryptjs"



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
        password : hashedPassword,
        auth: [authProvider],
        ...rest
    });
    return user;
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