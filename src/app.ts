import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { router } from "./app/routes";

import { envVars } from "./config/env";
import { globalErrorHandler } from "./app/middlewars/globalerrorhandelar";

const app = express();


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



export default app;