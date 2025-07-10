import { Schema } from "mongoose";
import { IAuthProvider, isActive, IUser, Role } from "./user.controller";



// auth provider schema 

const authProviderSchema = new Schema <IAuthProvider>({},{
    versionKey: false,
    _id: false
})

const userSchema = new Schema<IUser>({
    name : {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String},
    role: {
        type: String,
        enum: Object.values(Role),
        default: Role.USER
    },
    phone: {type: String},
    picture: {type: String},
    address: {type: String},
    isActive:{
        type: String,
        enum: Object.values(isActive),
        default: isActive.ACTIVE
    },
    isVerified: {type: String, default: false},
    auth: {
        type:[ {
            provider: {type: String, required: true}
        }]
    }

},{
    timestamps: true,
    versionKey: false,

}) 