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
const mongoose_1 = require("mongoose");
const ToDoModel_1 = require("./models/ToDoModel");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
run().catch((err) => console.log(err));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, mongoose_1.connect)("mongodb://127.0.0.1:27017/todolist");
        }
        catch (err) {
            console.log("db connection failed" + err);
        }
    });
}
app.get("/todolist", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const toDoList = yield ToDoModel_1.ToDoList.find();
        res.status(200).json(toDoList);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("something gone wrong");
    }
}));
app.get("/todolist/:status", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const toDoList = yield ToDoModel_1.ToDoList.where("status").equals(req.params.status);
        res.status(200).json(toDoList);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("something gone wrong");
    }
}));
app.post("/todolist/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const toDoList = new ToDoModel_1.ToDoList({
            content: "water plants",
            status: "trash",
        });
        yield toDoList.save();
        console.log(toDoList.content); // 'bill@initech.com'
        res.status(200).json(toDoList);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
}));
app.put("/todolist/update/:id/:newstatus", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const newStatus = req.params.newstatus;
        const updatedData = yield ToDoModel_1.ToDoList.findByIdAndUpdate(id, { status: newStatus }, { new: true });
        res.status(200).json(updatedData);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send("Error updating document");
    }
}));
app.delete("/todolist/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const deletedDoc = yield ToDoModel_1.ToDoList.findByIdAndDelete(id);
        if (!deletedDoc) {
            return res.status(404).send("Document not found");
        }
        res.status(200).send("Document deleted successfully");
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Error deleting document");
    }
}));
app.listen(8080, () => {
    console.log("server is running");
});
