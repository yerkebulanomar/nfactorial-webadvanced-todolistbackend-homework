import { connect } from "mongoose";
import { ToDoList } from "./models/ToDoModel";
import express, { Request, Response } from "express";

const app = express();

app.use(express.json());

run().catch((err) => console.log(err));

async function run() {
  try {
    await connect("mongodb://127.0.0.1:27017/todolist");
  } catch (err) {
    console.log("db connection failed" + err);
  }
}

app.get("/todolist", async (req: Request, res: Response) => {
  try {
    const toDoList = await ToDoList.find();
    res.status(200).json(toDoList);
  } catch (err) {
    console.error(err);
    res.status(500).send("something gone wrong");
  }
});

app.get("/todolist/:status", async (req: Request, res: Response) => {
  try {
    const toDoList = await ToDoList.where("status").equals(req.params.status);
    res.status(200).json(toDoList);
  } catch (err) {
    console.error(err);
    res.status(500).send("something gone wrong");
  }
});

app.post("/todolist/create", async (req: Request, res: Response) => {
  try {
    const toDoList = new ToDoList({
      content: "water plants",
      status: "trash",
    });
    await toDoList.save();
    console.log(toDoList.content); // 'bill@initech.com'
    res.status(200).json(toDoList);
  } catch (err: any) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
});

app.put(
  "/todolist/update/:id/:newstatus",
  async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const newStatus = req.params.newstatus;
      if (
        newStatus === "done" ||
        newStatus === "todo" ||
        newStatus === "trash"
      ) {
        const updatedData = await ToDoList.findByIdAndUpdate(
          id,
          { status: newStatus },
          { new: true }
        );
        res.status(200).json(updatedData);
      } else {
        res.status(406).send("Incorrect status");
      }
    } catch (err: any) {
      console.log(err.message);
      res.status(500).send("Error updating document");
    }
  }
);

app.delete("/todolist/delete/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    await ToDoList.findByIdAndDelete(id);
    res.status(200).send("Document deleted successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Document not found");
  }
});

app.listen(8080, () => {
  console.log("server is running");
});
