import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { authServices } from "./auth.services";
import AppError from "../../errorClass/AppError";
import { setAuthCookies } from "../../utils/set.cookie";

const credentialLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {


    const loginInfo = await authServices.credentialLogin(req.body);

    // res.cookie("accessToken", loginInfo.accessToken, {
    //     httpOnly: true,
    //     secure: false
    // })

    setAuthCookies(res, loginInfo)

    // res.cookie("refreshToken", loginInfo.refreshToken, {
    //     httpOnly: true,
    //     secure: false
    // })


    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.CREATED,
        message: "Login successfully ",
        data: loginInfo,
    })
})
const getNewAccessToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        throw new AppError(StatusCodes.BAD_REQUEST, "No token found from cookies")
    }

    const tokenInfo = await authServices.getNewAccessToken(refreshToken as string);
    // res.cookie("accessToken", tokenInfo.accessToken, {
    //     httpOnly: true,
    //     secure: false
    // })
    setAuthCookies(res, tokenInfo)

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.CREATED,
        message: "Login successfully ",
        data: tokenInfo,
    })
})
// logout function make 
const logout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })


    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "user Logout successfully ",
        data: null,
    })
})
const resetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    
    const oldPassword = req.body.newPassword;
    const newPassword = req.body.password;
    const decodedToken = req.user
    const newUpdatePassword = await authServices.resetPassword(oldPassword, newPassword, decodedToken)

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: " your password reset successfully ",
        data: null,
    })
})





export const authControllers = {
    credentialLogin,
    getNewAccessToken,
    logout,
    resetPassword
}