import { Schema } from "mongoose";
import { ITour } from "./tour.interface";


const tourModel = new Schema<ITour>({
    title: {type: String, required: true},
    slug:{type: String, required: true, unique: true},
    description: {type: String},
    images:{type: [String], default: []},
    location:{type: String},
    costFrom:{type: String},
    

},{
    timestamps: true,

})