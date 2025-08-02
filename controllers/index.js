const { employees } = require("../data");

// Exercise 1: Retrieve All Employees
const getAllEmployees = (req, res) => {
  res.json(employees);
};

// Exercise 2: Retrieve Employee by ID
const getEmployeeById = (req, res) => {
  const employeeId = parseInt(req.params.id);
  const employee = employees.find((emp) => emp.employeeId === employeeId);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).json({ error: "Employee not found" });
  }
};

module.exports = { getAllEmployees, getEmployeeById };
