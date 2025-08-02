const express = require("express");
const { getAllEmployees, getEmployeeById } = require("./controllers");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the CI/CD Pipeline");
});
// Routes
app.get("/employees", getAllEmployees);
app.get("/employees/:id", getEmployeeById);

module.exports = app;
