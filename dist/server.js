"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
let server;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(env_1.envVars.DB_URL);
        console.log("connect to the database ");
        server = app_1.default.listen(env_1.envVars.PORT, () => {
            console.log(`Server is listing on port ${env_1.envVars.PORT}`);
        });
    }
    catch (error) {
        console.log(error);
    }
});
startServer();
process.on("uncaughtException", (err) => {
    console.log("uncaught exception Detected", err);
    if (server) {
        server.close(() => {
            process.exit();
        });
    }
});
process.on("SIGABRT", () => {
    console.log("SIGABRT signal received....., server  ");
    if (server) {
        server.close(() => {
            process.exit();
        });
    }
});
process.on("SIGINT", () => {
    console.log("SIGINT signal received....., server  ");
    if (server) {
        server.close(() => {
            process.exit();
        });
    }
});
// unhandled rejection error 
// Promise.reject(new Error("i forget to catch this error"))
// uncaught exception error 
// throw new Error("I forget to handle this local error")
