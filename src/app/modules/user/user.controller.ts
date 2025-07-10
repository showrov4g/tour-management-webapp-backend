export enum Role {
    SUPPER_ADMIN = "SUPPER_ADMIN",
    ADMIN = "ADMIN",
    USER = "USER",
    GUIDE = "GUIDE"
}


// auth provider 
export interface IAuthProvider{
    provider: string; // "google", "Credential"
    providerId: string;
}


export interface IUser {
    user: string;
    email: string;
    password?: string;
    phone?: string;
    picture?: string;
    address?: string;
    isDeleted?: string;
    isActive?: string;
    role: "USER" | "ADMIN" | "GUIDE";
    auth: IAuthProvider;
    bookings?:
    guides?:
}