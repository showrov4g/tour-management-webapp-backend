import { Schema } from "mongoose";
import { IUser } from "./user.controller";


const userSchema = new Schema<IUser>({},{
    timestamps: true,
    versionKey: false,
    
}) 