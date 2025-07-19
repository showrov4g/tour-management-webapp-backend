import dotenv from "dotenv"

dotenv.config();

interface EnvConfig {
    PORT: string,
    DB_URL: string,
    NODE_ENV: "development" | "production",
    JWT_ACCESS_SECRET: string,
    JWT_ACCESS_EXPIRES: string,
    BCRYPT_SOLT_ROUND: string,
    SUPPER_ADMIN_EMAIL: string,
    SUPPER_ADMIN_PASSWORD: string,
    JWT_REFRESH_SECRET: string,
    JWT_REFRESH_EXPIRES: string
}

const loadEnvVariable = () => {

    const requiredEnvVariable: string[] = ["PORT", "DB_URL", "NODE_ENV", "JWT_ACCESS_EXPIRES", "JWT_ACCESS_SECRET", "BCRYPT_SOLT_ROUND", "SUPPER_ADMIN_EMAIL", "SUPPER_ADMIN_PASSWORD", "JWT_REFRESH_SECRET", "JWT_REFRESH_EXPIRES"];

    requiredEnvVariable.forEach((keys) => {
        if (!process.env[keys]) {
            throw new Error(`Missing required env variable ${keys}`)
        }
    })

    return {
        PORT: process.env.PORT as string,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        DB_URL: process.env.DB_URL!,
        NODE_ENV: process.env.NODE_ENV as "development" | "production",
        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
        JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES as string,
        BCRYPT_SOLT_ROUND: process.env.BCRYPT_SOLT_ROUND as string,
        SUPPER_ADMIN_EMAIL: process.env.SUPPER_ADMIN_EMAIL as string,
        SUPPER_ADMIN_PASSWORD: process.env.SUPPER_ADMIN_PASSWORD as string,
        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
        JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES as string

    }

}


export const envVars: EnvConfig = loadEnvVariable();