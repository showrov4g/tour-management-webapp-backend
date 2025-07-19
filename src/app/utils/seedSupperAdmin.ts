import { envVars } from "../../config/env"
import { IAuthProvider, IUser, Role } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model"
import bcrypt from "bcryptjs"

export const seedSupperAdmin = async()=>{
    try {
        const isSupperAdminExist = await User.findOne({email: envVars.SUPPER_ADMIN_EMAIL})
        if(isSupperAdminExist){
            console.log("supper admin already exist");
            return
        }

        console.log("try to create the supper admin")
        const hashedPassword = await bcrypt.hash(envVars.SUPPER_ADMIN_PASSWORD, Number(envVars.BCRYPT_SOLT_ROUND));


        const authProvider: IAuthProvider ={
            provider: "credential",
            providerId: envVars.SUPPER_ADMIN_EMAIL
        }

        const payload: IUser = {
            name : "Supper admin",
            role: Role.SUPPER_ADMIN,
            email: envVars.SUPPER_ADMIN_EMAIL,
            password : hashedPassword,
            isVerified: true,
            auth: [authProvider]

        }
        const superAdmin = await User.create(payload)

        console.log("supper admin created successfully! \n");
        console.log(superAdmin);
    } catch (error) {
        console.log(error)
    }
}