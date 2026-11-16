const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to Narapa's shop!");
});

app.get("/about", (req, res) => {
  res.send("I am Narapa, learning backend!");
});

app.get("/hello", (req, res) => {
  res.json({ message: "Hello from my server", day: 3 });
});

app.listen(3000, () => {
  console.log("Shop is open at http://localhost:3000");
});