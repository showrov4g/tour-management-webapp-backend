


// =====================================================
/* eslint-disable no-console */
import { Server } from "http"
import mongoose from "mongoose";
import app from "./app";
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin";
import { envVars } from "./app/config/env";


let server: Server;

const PORT = Number(envVars.PORT) || 5000;


const startServer = async () => {
    try {
        await mongoose.connect(envVars.DB_URL);

        console.log("connect to the database ");
        server = app.listen(PORT, () => {
            console.log(`Server is listing on port ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

(async() => {
   await startServer();
   await seedSuperAdmin();
}) ()

process.on("uncaughtException", (err) => {
    console.log("uncaught exception Detected", err);
    if (server) {
        server.close(() => {
            process.exit()
        })

    }
});

process.on("SIGABRT", () => {
    console.log("SIGABRT signal received....., server  ");
    if (server) {
        server.close(() => {
            process.exit()
        })

    }
});

process.on("SIGINT", () => {
    console.log("SIGINT signal received....., server  ");
    if (server) {
        server.close(() => {
            process.exit()
        })

    }
})





// // unhandled rejection error
// // Promise.reject(new Error("i forget to catch this error"))
// // uncaught exception error
// // throw new Error("I forget to handle this local error")