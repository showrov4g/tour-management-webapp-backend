/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { User } from "./user.model";
import httpStatus, { StatusCodes } from "http-status-codes";
import { UserServices } from "./user.service";
import AppError from "../../errorClass/AppError";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

// handler 


const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction)=>{
        const user = await UserServices.createUser(req.body)

        // res.status(httpStatus.CREATED).json({
        //     message: 'User created Successfully',
        //     user
        // })

        sendResponse(res, {
            success: true,
            statusCode: StatusCodes.CREATED,
            message: "user create successfully",
            data: user
        })
})


// const createUser = async (req: Request, res: Response, next: NextFunction) => {
//     try {

//         const user = await UserServices.createUser(req.body)

//         res.status(httpStatus.CREATED).json({
//             message: 'User created Successfully',
//             user
//         })
//         throw new AppError(httpStatus.BAD_REQUEST, "fake error")
//     } catch (err: any) {
//         console.log(err);
//         next(err)
//     }
// }

// get all user controllers 

const getAllUser = catchAsync(async (req: Request, res: Response, next: NextFunction)=>{
    const users =await UserServices.getAllUser();
    // res.status(StatusCodes.OK).json({
    //     success: true,
    //     message: "All user data found",
    //     users
    // })

     sendResponse(res, {
            success: true,
            statusCode: StatusCodes.CREATED,
            message: "user create successfully",
            data: users.data,
            meta: users.meta
        })
})


// const getALlUser = async(req: Request, res: Response, next: NextFunction) =>{
//     try {
//         const users =await UserServices.getAllUser(); 
//         return users;
//     } catch (error: any) {
//         console.log(error);
//         next(error)
//     }
// }


export const UserControllers = {
    createUser,
    getAllUser
}