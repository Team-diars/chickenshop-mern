const Employee = require("../models/Employee");

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    return res.json(employees);
  } catch (error) {
    return res.status(500).send("Server error");
  }
};

const registerEmployee = async (req, res) => {
  try {
    const { name, lastname, dni, address, email } = req.body;
    const employee = new Employee({ name, lastname, dni, address, email });
    await employee.save();
    return res.json({
      status: "OK",
    });
  } catch (error) {
    return res.status(500).send("Server error");
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const newEmployee = req.body;
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(500).send("Employee doesn't exist");
    }
    await Employee.findByIdAndUpdate(id, newEmployee, {
      new: true,
    });
    res.json({
      status: "OK",
    });
  } catch (error) {
    return res.status(500).send("Server error");
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(500).send("Employee doesn't exist");
    }
    await Employee.findByIdAndUpdate(
      id,
      { status: false },
      {
        new: true,
      }
    );
    return res.json({
      status: "OK",
    });
  } catch (error) {}
};

module.exports = {
  getEmployees,
  registerEmployee,
  updateEmployee,
  deleteEmployee,
};
