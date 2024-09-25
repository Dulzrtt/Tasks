import {model, Schema} from "mongoose";

const ToDoSchema = new Schema(
    {
        name: {type: String},
        date: {type: Date},
        desc: {type: String}
    }
)

export const ToDoModel = model("ToDo", ToDoSchema);