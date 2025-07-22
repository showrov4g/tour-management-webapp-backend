import passport from "passport";
import { Strategy as googleStrategy, Profile, VerifyCallback } from "passport-google-oauth20";
import { envVars } from "./env";
import { User } from "../app/modules/user/user.model";
import { Role } from "../app/modules/user/user.interface";
import { Strategy as localStrategy, VerifyFunction } from "passport-local";
import bcryptjs from "bcryptjs"



passport.use(
    new googleStrategy(
        {
            clientID: envVars.GOOGLE_CLIENT_ID,
            clientSecret: envVars.GOOGLE_CLIENT_SECRECT,
            callbackURL: envVars.GOOGLE_CALLBACK_URL
        }, async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
            try {
                const email = profile.emails?.[0].value;
                if (!email) {
                    return done(null, false, { message: "No email found" })
                }
                let user = await User.findOne({ email })

                if (!user) {
                    user = await User.create({
                        email,
                        name: profile.displayName,
                        picture: profile.photos?.[0].value,
                        role: Role.USER,
                        isVerified: true,
                        auth: [
                            {
                                provider: "google",
                                providerId: profile.id,
                            }
                        ]
                    })
                }
                return done(null, user)

            } catch (error) {
                console.log(error);
                return done(error)
            }
        }
    )
)


passport.serializeUser((user: any, done: (err: any, id?: unknown) => void) => {
    done(null, user._id)
})

passport.deserializeUser(async (id: string, done: any) => {
    try {
        const user = await User.findById(id);
        done(null, user)
    } catch (error) {
        console.log(error)
        done(error);
    }
})


// login with email and password 

passport.use(
    new localStrategy({
        usernameField: "email",
        passwordField: "password"
    }, async (email: string, password: string, done: VerifyFunction) => {
        try {
            const isUserExist = await User.findOne({ email });
            // if (!isUserExist) {
            //     return done(null, false, { message: "User not found" })
            // }
            if(!isUserExist){
                return done("User dose not exists")
            }
            const isGoogleAuthenticate = isUserExist?.auth?.some(providerObject => providerObject.provider === "google");

            if(isGoogleAuthenticate && !isUserExist.password){
                return done(null, false, {message: "you have login with google authentication so no need to password"})
            }
            // password hash 
            const isPasswordMatch = await bcryptjs.compare(password as string, isUserExist.password as string);

            if (!isPasswordMatch) {
                return done(null, false, {message: "Password dose not match"})
            }

            return done(null, isUserExist)




        } catch (error) {
            done(error);
            console.log(error)
        }
    })
)