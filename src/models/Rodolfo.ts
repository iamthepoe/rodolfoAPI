import { Schema } from "mongoose";

interface IRodolfo{
    name: String;
    state: String;
    path: String;
}

const RodolfoModel = new Schema<IRodolfo>({
    name: {type: String, required: true},
    state: {type: String, default: 'stateless'},
    path: {type: String, required:true}
});

export {RodolfoModel, IRodolfo};