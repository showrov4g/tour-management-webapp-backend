import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { authServices } from "./auth.services";
import AppError from "../../errorClass/AppError";

const credentialLogin =catchAsync(async (req: Request, res: Response, next: NextFunction)=>{


    const loginInfo = await authServices.credentialLogin(req.body);
        res.cookie("refreshToken", loginInfo.refreshToken, {
            httpOnly: true,
            secure: false
        })


     sendResponse(res, {
            success: true,
            statusCode: StatusCodes.CREATED,
            message: "Login successfully ",
            data: loginInfo,
        })
})
const getNewAccessToken =catchAsync(async (req: Request, res: Response, next: NextFunction)=>{

    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken){
        throw new AppError(StatusCodes.BAD_REQUEST,"No token found from cookies")
    }

    const tokenInfo = await authServices.getNewAccessToken(refreshToken);


     sendResponse(res, {
            success: true,
            statusCode: StatusCodes.CREATED,
            message: "Login successfully ",
            data: tokenInfo,
        })
})


export const authControllers = {
    credentialLogin,
    getNewAccessToken 
}