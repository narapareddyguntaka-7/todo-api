const express = require("express");
const router = express.Router();

let todos = [
  { id: 1, task: "Learn Node.js", done: true, priority: "high" },
  { id: 2, task: "Learn Express", done: false, priority: "medium" },
];
let nextId = 3;

const validPriorities = ["low", "medium", "high"];

// READ: show all items
router.get("/", (req, res) => {
  res.json(todos);
});

// CREATE: add a new item
router.post("/", (req, res) => {
  const { task, priority } = req.body || {};

  if (!task || typeof task !== "string" || task.trim() === "") {
    return res.status(400).json({ message: "Task is required" });
  }
  if (priority !== undefined && !validPriorities.includes(priority)) {
    return res
      .status(400)
      .json({ message: "Priority must be low, medium or high" });
  }

  const newTodo = {
    id: nextId++,
    task: task.trim(),
    done: false,
    priority: priority || "medium",
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// UPDATE: change an item
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find((t) => t.id === id);
  if (!todo) return res.status(404).json({ message: "Todo not found" });

  const { task, done, priority } = req.body || {};
  if (priority !== undefined && !validPriorities.includes(priority)) {
    return res
      .status(400)
      .json({ message: "Priority must be low, medium or high" });
  }

  if (task !== undefined) todo.task = task;
  if (done !== undefined) todo.done = done;
  if (priority !== undefined) todo.priority = priority;
  res.json(todo);
});

// DELETE: remove an item
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) return res.status(404).json({ message: "Todo not found" });
  todos.splice(index, 1);
  res.json({ message: "Deleted" });
});

module.exports = router;