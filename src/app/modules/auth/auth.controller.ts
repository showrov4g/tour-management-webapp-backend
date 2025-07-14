import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { authServices } from "./auth.services";

const credentialLogin =catchAsync(async (req: Request, res: Response, next: NextFunction)=>{


    const loginInfo = await authServices.credentialLogin(req.body);


     sendResponse(res, {
            success: true,
            statusCode: StatusCodes.CREATED,
            message: "Login successfully ",
            data: loginInfo,
        })
})


export const authControllers = {
    credentialLogin
}