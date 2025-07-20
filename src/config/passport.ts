import passport from "passport";
import { Strategy as googleStrategy, Profile } from "passport-google-oauth20";
import { envVars } from "./env";
passport.use(
    new googleStrategy(
        {
            clientID: envVars.GOOGLE_CLIENT_ID,
            clientSecret: envVars.GOOGLE_CLIENT_SECRECT,
            callbackURL: envVars.GOOGLE_CALLBACK_URL
        }, async(accessToken: string, refreshToken: string, profile: Profile  )=>{

        }
    )
)