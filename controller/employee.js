const Employee = require("../models/Employee");

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({ status: 1 }).exec();
    return res.json(employees);
  } catch (error) {
    return res.status(500).send("Server error");
  }
};

const getEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const checkifexists = await Employee.exists({ _id: id, status: 1 });
    if (!checkifexists) {
      return res.status(500).send("Employee not found");
    }
    const employee = await Employee.findById(id);
    return res.json(employee);
  } catch (error) {
    return res.status(500).send("Server error");
  }
};

const registerEmployee = async (req, res) => {
  try {
    const { name, lastname, role, dni, address, email } = req.body;
    const exists = await Employee.exists({ dni: dni, status: 0 });
    if (exists) {
      const employee = await Employee.findOneAndUpdate(
        { dni },
        { name, lastname, role, dni, address, email, status: 1 }
      );
      return res.json({
        status: "OK",
        newEmployee: employee,
      });
    }
    const newEmployee = new Employee({
      name,
      lastname,
      role,
      dni,
      address,
      email,
    });
    await newEmployee.save();
    return res.json({
      status: "Employee registered",
      newEmployee: newEmployee,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(500).send("Employee is already registered");
    }
    return res.status(500).send("Server error");
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, lastname, role, dni, address, email } = req.body;
    const exists = await Employee.exists({ _id: id, status: 1 });
    if (!exists) {
      return res.status(500).send("Employee doesn't exist");
    }
    const employee = await Employee.findByIdAndUpdate(
      id,
      { name, lastname, role, dni, address, email },
      {
        new: true,
      }
    );
    res.json({
      status: "Employee updated",
      employee: employee,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(500).send("Employee is already registered");
    }
    return res.status(500).send("Server error");
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.exists({ _id: id, status: 1 });
    if (!employee) {
      return res.status(500).send("Employee doesn't exist");
    }
    await Employee.findByIdAndUpdate(
      id,
      { status: 0 },
      {
        new: true,
      }
    );
    return res.json({
      status: "Employee was removed Successfully",
    });
  } catch (error) {}
};

module.exports = {
  getEmployees,
  getEmployee,
  registerEmployee,
  updateEmployee,
  deleteEmployee,
};
