"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToDoList = void 0;
const mongoose_1 = require("mongoose");
const ToDoSchema_1 = require("../schemas/ToDoSchema");
exports.ToDoList = (0, mongoose_1.model)("ToDoList", ToDoSchema_1.toDoListSchema);
