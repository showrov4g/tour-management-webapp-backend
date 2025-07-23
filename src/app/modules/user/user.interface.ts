import { Types } from "mongoose";

export enum Role {
    SUPPER_ADMIN = "SUPPER_ADMIN",
    ADMIN = "ADMIN",
    USER = "USER",
    GUIDE = "GUIDE"
}


// auth provider 
export interface IAuthProvider {
    provider: "google" | "credential"; // "google", "Credential"
    providerId: string;
}

export enum isActive {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    BLOCKED = "BLOCKED"
}

export interface IUser {
    _id: Types.ObjectId
    name: string;
    age: number;
    user: string;
    email: string;
    password ?: string;
    phone ?: string;
    picture ?: string;
    address ?: string;
    isDeleted ?: boolean;
    isActive ?: isActive;
    isVerified ?: boolean;
    role: Role;
    auth: IAuthProvider[];
    bookings ?: Types.ObjectId[];
    guides ?: Types.ObjectId[];
}