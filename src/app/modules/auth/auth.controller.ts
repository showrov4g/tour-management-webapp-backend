import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { authServices } from "./auth.services";
import AppError from "../../errorClass/AppError";
import { setAuthCookies } from "../../utils/set.cookie";
import { createUserToken } from "../../utils/userToken";
import { envVars } from "../../../config/env";
import { JwtPayload } from "jsonwebtoken";
import passport from "passport";

const credentialLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    // const loginInfo = await AuthServices.credentialsLogin(req.body)

    passport.authenticate("local", async (err: any, user: any, info: any) => {

        if (err) {

            // ❌❌❌❌❌
            // throw new AppError(401, "Some error")
            // next(err)
            // return new AppError(401, err)


            // ✅✅✅✅
            // return next(err)
            // console.log("from err");
            return next(new AppError(401, err))
        }

        if (!user) {
            // console.log("from !user");
            // return new AppError(401, info.message)
            return next(new AppError(401, info.message))
        }

        const userTokens = await createUserToken(user)

        // delete user.toObject().password

        const { password: pass, ...rest } = user.toObject()


        setAuthCookies(res, userTokens)

        sendResponse(res, {
            success: true,
            statusCode: StatusCodes.OK,
            message: "User Logged In Successfully",
            data: {
                accessToken: userTokens.accessToken,
                refreshToken: userTokens.refreshToken,
                user: rest

            },
        })
    })(req, res, next)

    // res.cookie("accessToken", loginInfo.accessToken, {
    //     httpOnly: true,
    //     secure: false
    // })


    // res.cookie("refreshToken", loginInfo.refreshToken, {
    //     httpOnly: true,
    //     secure: false,
    // })

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
    await authServices.resetPassword(oldPassword, newPassword, decodedToken as JwtPayload)

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: " your password reset successfully ",
        data: null,
    })
})
const googleCallback = catchAsync(async (req: Request, res: Response, next: NextFunction) => {


    let redirectTo = req.query.state ? req.query.state as string : ""

    if (redirectTo.startsWith('/')) {
        redirectTo = redirectTo.slice(1)
    }


    const user = req.user;
    console.log("user", user);
    if (!user) {
        throw new AppError(StatusCodes.NOT_FOUND, "User data not found")
    }
    const tokenInfo = createUserToken(user);
    setAuthCookies(res, tokenInfo)

    // sendResponse(res, {
    //     success: true,
    //     statusCode: StatusCodes.OK,
    //     message: " your password reset successfully ",
    //     data: null,
    // })
    res.redirect(`${envVars.FRONTEND_URL}/${redirectTo}`)
})





export const authControllers = {
    credentialLogin,
    getNewAccessToken,
    logout,
    resetPassword,
    googleCallback
}