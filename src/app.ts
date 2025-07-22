import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { router } from "./app/routes";
import httpStatus from "http-status-codes"
import { globalErrorHandler } from "./app/middlewars/globalerrorhandelar";
import { notFound } from "./app/middlewars/notFound";
import cookieParser from "cookie-parser";
import passport from "passport";
import expressSession from "express-session"
import "./config/passport"

const app = express();

app.use(expressSession({
    secret : "your secret",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser())
app.use(cors());
app.use(express.json());

app.use('/api/v1',router)


app.get("/", (req: Request,res: Response)=>{
    res.status(200).json({
        message: "Welcome to the tour management application backend"

    })
})

// global error handle 
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
app.use(globalErrorHandler);
app.use(notFound)



export default app;