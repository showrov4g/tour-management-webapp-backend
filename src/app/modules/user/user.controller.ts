/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { User } from "./user.model";
import httpStatus from "http-status-codes";
import { UserServices } from "./user.service";
import AppError from "../../errorClass/AppError";

// handler 
type AsyncHandler = (req: Request, res: Response, next: NextFunction)=>Promise<void>

const catchAsync = (fn: AsyncHandler)



const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const user = await UserServices.createUser(req.body)

        res.status(httpStatus.CREATED).json({
            message: 'User created Successfully',
            user
        })
        throw new AppError(httpStatus.BAD_REQUEST, "fake error")
    } catch (err: any) {
        console.log(err);
        next(err)
    }
}

// get all user controllers 
const getALlUser = async(req: Request, res: Response, next: NextFunction) =>{
    try {
        const users =await UserServices.getAllUser(); 
        return users;
    } catch (error: any) {
        console.log(error);
        next(error)
    }
}


export const UserControllers = {
    createUser,
    getALlUser
}