/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { User } from "./user.model";
import httpStatus from "http-status-codes";
import { UserServices } from "./user.service";
import AppError from "../../errorClass/AppError";


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



export const UserControllers = {
    createUser
}