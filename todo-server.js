// Todo API by Narapa: create, read, update and delete tasks
const express = require("express");
const todoRoutes = require("./routes/todos");

const app = express();

app.use(express.json());

// Middleware: the guard who writes down every visitor
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// Send every address that starts with /todos to the todo room
app.use("/todos", todoRoutes);

// Middleware: runs only if no counter matched
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(3000, () => {
  console.log("Todo shop is open at http://localhost:3000");
});