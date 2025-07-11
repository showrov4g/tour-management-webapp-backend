import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { router } from "./app/routes";
import httpStatus from "http-status-codes";

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
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.BAD_GATEWAY).json({
    success: false,
    message: `Something went wrong: ${err.message}`,
    err,
  });
});



export default app;