import dotenv from "dotenv"

dotenv.config();

interface EnvConfig {
    PORT: string,
    DB_URL: string,
    NODE_ENV: "development" | "production" 
}

const loadEnvVariable = () => {

    const requiredEnvVariable: string[] = ["PORT","DB_URL","NODE_ENV"];

    requiredEnvVariable.forEach((keys)=>{
        if(!process.env[keys]){
            throw new Error(`Missing required env variable ${keys}`)
        }
    })

    return {
        PORT: process.env.PORT as string,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        DB_URL: process.env.DB_URL!,
        NODE_ENV: process.env.NODE_ENV as "development" | "production"
    }
}


export const envVars: EnvConfig = loadEnvVariable();