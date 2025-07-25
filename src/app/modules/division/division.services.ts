import { IDivition } from "./division.interface";
import { Division } from "./divition.model";

const createDivision = async (payload: IDivition)=>{
    const existingDivision = await Division.findOne({name: payload.name});
    if(existingDivision){
        throw new Error("A division with this name already exist");
    }
    const division =  await Division.create(payload);
    return division;
}

