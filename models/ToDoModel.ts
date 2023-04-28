import { model } from "mongoose";
import { IToDoList } from "../interfaces/ITodo";
import { toDoListSchema } from "../schemas/ToDoSchema";

export const ToDoList = model<IToDoList>("ToDoList", toDoListSchema);
