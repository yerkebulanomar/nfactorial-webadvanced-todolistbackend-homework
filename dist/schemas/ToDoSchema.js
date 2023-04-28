"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDoListSchema = void 0;
const mongoose_1 = require("mongoose");
exports.toDoListSchema = new mongoose_1.Schema({
    content: { type: String, required: true },
    status: { type: String, enum: ["todo", "done", "trash"], required: true },
});
