import { NextFunction, Request, Response } from "express";
import { envVars } from "../../config/env";
import httpStatus from "http-status-codes";
import AppError from "../errorClass/AppError";


// handle duplicate error 
const handleDuplicateError = (err : any) =>{
  
}



export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

  let statusCode = 500;
  let message = `Something went wrong`;
  const errorSocurse : any = [];

  if (err.code === 11000) {
    console.log("duplicate error", err.message);
    const duplicate = err.message.match(/"([^"]*)"/)
    statusCode = 400;
    message = `${duplicate[1]} Already exist`
  } else if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid mongodb object id. please provide valid id"
  }
  // zod validation error 
  else if(err.name === "ZodError"){
    statusCode = 400 ;
    message = "zod Error"
    console.log(err.issues);
    err.issues.forEach((issue: any)=>{
      errorSocurse.push({
        path: issue.path[0],
        message: issue.message
      })
    })
  }
    // mongoose validation error 
  else if(err.name ==="ValidationError"){
    statusCode = 400;
    const errors = Object.values(err.errors)
    
    errors.forEach((errorObject: any) => errorSocurse.push({
      path : errorObject.path,
      message: errorObject.message
    }))
    message = err.message;
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
    err,
    stack: envVars.NODE_ENV === "development" ? err.stack : null
  });
}
