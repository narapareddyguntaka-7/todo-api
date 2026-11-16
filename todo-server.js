// Todo API by Narapa: create, read, update and delete tasks
const express = require("express");
const app = express();

app.use(express.json());

let todos = [
    { id: 1, task: "Learn Node.js", done: true},
    { id: 2, task: "Leran Express", done: false},
];
let nextId = 3;

app.get("/todos",(req, res) => {
    res.json(todos);
});

app.post("/todos", (req,res) =>{
    const newTodo = { id: nextId++,task: req.body.task, done: false};
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

app.put("/todos/:id", (req,res) => {
    const id = Number(req.params.id);
    const todo = todos.find((t) => t.id == id);
    if (req.body.task !== undefined) todo.task = req.body.task;
    if (req.body.done !== undefined) todo.done = req.body.done;
    res.json(todo);
});

app.delete("/todos/:id", (req,res) =>{
    const id =Number(req.params.id);
    const index = todos.findIndex((t) => t.id === id);
    if (index === -1) return res.status(404).json({ message: "Todo not found"});
    todos.splice(index,1);
    res.json({ message: "Deleted" });
});

app.post("/todos", (req, res) => {
  const newTodo = { id: nextId++, task: req.body.task, done: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.listen(3000, () => {
    console.log("Todo shop is open at http://localhost:3000");
});