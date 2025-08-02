const express = require("express");
const { getAllEmployees, getEmployeeById } = require("./controllers");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Employee API");
});
// Routes
app.get("/employees", getAllEmployees);
app.get("/employees/:id", getEmployeeById);

module.exports = app;
