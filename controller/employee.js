const Employee = require("../models/Employee");

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({ status: true }).exec();
    return res.json(employees);
  } catch (error) {
    return res.status(500).send("Server error");
  }
};

const getEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const checkifexists = await Employee.exists({ _id: id, status: true });
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
    const { name, lastname, dni, address, email } = req.body;
    const checkifexists = await Employee.exists({ name: name, status: false });
    if (checkifexists) {
      await Employee.findOneAndUpdate(
        { dni },
        { name, lastname, dni, address, email, status: true }
      );
      return res.json({
        status: "OK",
      });
    }
    const newEmployee = new Employee({ name, lastname, dni, address, email });
    await newEmployee.save();
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
    const checkifexists = await Employee.exists({ _id: id, status: true });
    if (!checkifexists) {
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
    const employee = await Employee.exists({ _id: id, status: true });
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
  getEmployee,
  registerEmployee,
  updateEmployee,
  deleteEmployee,
};
