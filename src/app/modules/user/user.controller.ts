/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";

const createUser = async (req: Request, res: Response)=>{
    try {
        const {name, email} = req.body;
        
        
    } catch (error: any) {
        console.log(error);
        res.status(400).json({
            message: `Something getting wrong ${error.message}`,
            error
        })
    }
}