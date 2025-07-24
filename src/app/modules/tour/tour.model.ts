import { model, Schema, Types } from "mongoose";
import { ITour, ITourTypes } from "./tour.interface";

const tourTypeSchema = new Schema<ITourTypes>({
    name: {type: String, required:true, unique: true}
},{
    timestamps: true
})

export const tourType = model<ITourTypes>("tourType", tourTypeSchema)


const tourModel = new Schema<ITour>({
    title: {type: String, required: true},
    slug:{type: String, required: true, unique: true},
    description: {type: String},
    images:{type: [String], default: []},
    location:{type: String},
    costFrom:{type: String},
    startDate: {type: Date},
    endDate: {type: Date},
    included: {type: [String], default: []},
    excluded: {type: [String], default: []},
    amenities:{type: [String], default: []},
    maxGuest:{type: Number},
    minAge: {type: Number},
    division: {
        type: Schema.Types.ObjectId, 
        ref:"Division",
        required: true
    },
    tourType:{
        type: Schema.Types.ObjectId,
        ref:"tourType" ,
        required: true,
    }

},{
    timestamps: true,

})