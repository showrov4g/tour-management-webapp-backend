import { model, Schema } from "mongoose";
import { IAuthProvider, isActive, IUser, Role } from "./user.interface";
import { boolean } from "zod";



// auth provider schema 

const authProviderSchema = new Schema <IAuthProvider>({
    provider: {type: String, required: true},
    providerId: {type: String, required: true}
},{
    versionKey: false,
    _id: false
})

const userSchema = new Schema<IUser>({
    name : {type: String, required: true},
    email: {type: String, required: true, unique: true},
    age: {type: Number},
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
    isVerified: {type: Boolean, default: false},
    isDeleted: {type: Boolean, default:false},
    auth: [authProviderSchema]

},{
    timestamps: true,
    versionKey: false,

}) 

export const User = model<IUser>("User", userSchema)