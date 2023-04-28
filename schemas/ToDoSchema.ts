import { Schema } from "mongoose";
import { IToDoList } from "../interfaces/ITodo";

export const toDoListSchema = new Schema<IToDoList>({
  content: { type: String, required: true },
  status: { type: String, enum: ["todo", "done", "trash"], required: true },
});
