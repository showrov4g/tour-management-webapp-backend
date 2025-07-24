import { NextFunction, Request, Response } from "express";
import { envVars } from "../../config/env";
import httpStatus from "http-status-codes";
import AppError from "../errorClass/AppError";
import mongoose from "mongoose";
import { handleDuplicateError } from "../helpers/handleDuplicateError";
import { handleCastError } from "../helpers/handle.castError";
import { handleValidationError } from "../helpers/handleValidationerrrot";
import { handleZodError } from "../helpers/handleZodError";
import { TErrorsource } from "../interfaces/error.types";


export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if(envVars.NODE_ENV === "development"){
    console.log(err)
  }


  let statusCode = 500;
  let message = `Something went wrong`;
  let errorSocurse: TErrorsource[] = [];

  if (err.code === 11000) {
    const simplisyError = handleDuplicateError(err)
    statusCode = simplisyError.statusCode as number
    message = simplisyError.message
  }
  // cast error 
  else if (err.name === "CastError") {
    const simplisyError = handleCastError(err)
    statusCode = simplisyError.statusCode as number
    message = simplisyError.message
  }
  // zod validation error 
  else if (err.name === "ZodError") {
    const smiplifiedError = handleZodError(err);
    statusCode = smiplifiedError.statusCode;
    message = smiplifiedError.message;
    errorSocurse = smiplifiedError.errorSocurse;
   
  }
  // mongoose validation error 
  else if (err.name === "ValidationError") {

    const smiplifiedError = handleValidationError(err)
    errorSocurse = smiplifiedError.errorSocurse;
    statusCode = smiplifiedError.statuscode;
    message = smiplifiedError.message
  }
  else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message
  } else if (err instanceof Error) {
    statusCode = 500;
    message = err.message
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSocurse,
    err: envVars.NODE_ENV === "development" ? err : null ,
    stack: envVars.NODE_ENV === "development" ? err.stack : null
  });
}
