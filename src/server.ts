/* eslint-disable no-console */
import { Server} from "http"
import mongoose from "mongoose";
import app from "./app";


let server: Server;

const startServer = async () => {
    try {
        await mongoose.connect('mongodb+srv://learning:7CZIO6IRQ7D63BZ4@cluster0.23lvn.mongodb.net/tour-management-app?retryWrites=true&w=majority&appName=Cluster0');

        console.log("connect to the database ");
       server = app.listen(5000, () => {
            console.log("Server is listing on port 5000")
        })
    } catch (error) {
        console.log(error)
    }
}

startServer();


process.on("uncaughtException", (err)=>{
    console.log("uncaught exception Detected", err);
    if(server){
        server.close(()=>{
             process.exit()
        })
        
    }
});

process.on("SIGABRT", ()=>{
    console.log("SIGABRT signal received....., server  ");
    if(server){
        server.close(()=>{
             process.exit()
        })
        
    }
});

process.on("SIGINT", ()=>{
    console.log("SIGINT signal received....., server  ");
    if(server){
        server.close(()=>{
              process.exit()
        })
       
    }
})





// unhandled rejection error 
// Promise.reject(new Error("i forget to catch this error"))
// uncaught exception error 
// throw new Error("I forget to handle this local error")