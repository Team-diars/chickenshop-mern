const Employee = require("../models/Employee");

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({ status: 1 }).sort({date: 1}).exec();
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
    const existsDNI = await Employee.exists({ dni, status: 0 });
    const existsEmail = await Employee.exists({ email, status: 0 });
    if (existsDNI && existsEmail) {
      const employee = await Employee.findOneAndUpdate(
        { dni, email },
        { name, lastname, role, dni, address, email, status: 1 }
      );
      return res.json(employee);
    }else if (existsDNI){
      const employee = await Employee.findOneAndUpdate(
        { dni },
        { name, lastname, role, dni, address, email, status: 1 }
      );
      return res.json(employee);
    }else if(existsEmail){
      const employee = await Employee.findOneAndUpdate(
        { email },
        { name, lastname, role, dni, address, email, status: 1 }
      );
      return res.json(employee);
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
    return res.json(newEmployee);
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
    if (!exists) return res.status(500).send("Employee doesn't exist");
    const isSameEmployee = await Employee.exists({_id:id,dni,email});
    const duplicatedEmployee = await Employee.exists({ dni: dni, status: 0 });
    const EmployeeDNI = await Employee.exists({ dni, status: 1 });
    const EmployeeEmail = await Employee.exists({ email, status: 1 });
    if (duplicatedEmployee) {
      await Employee.findByIdAndRemove(id);
      const employeeUpdated = await Employee.findOneAndUpdate({ dni, status:0 },{ name, lastname, role, dni, address, email, status: 1 });
      return res.json(employeeUpdated);
    }else {
      if (EmployeeDNI && !isSameEmployee){
        return res.status(500).json({
          errors: [{msg:`There is an employee with this DNI registered`}]
        });
      }else if (EmployeeEmail && !isSameEmployee) {
        return res.status(500).json({
          errors: [{msg:`There is an employee with this email registered`}]
        });
      }else if ((EmployeeDNI && EmployeeEmail) && !isSameEmployee){
        return res.status(500).json({
          errors: [{msg:`There is an employee with those dni and email registered`}]
        });
      }
    }
    const employee = await Employee.findByIdAndUpdate(
      id,{ name, lastname, role, dni, address, email }, { new: true }
    );
    return res.json(employee);
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
    if (!employee) return res.status(500).send("Employee doesn't exist");
    await Employee.findByIdAndUpdate(id,{ status: 0 }, { new: true });
    return res.json({ status: "Employee was removed Successfully" });
  } catch (error) {
    return res.status(500).send("Server error");
  }
};

module.exports = {
  getEmployees,
  getEmployee,
  registerEmployee,
  updateEmployee,
  deleteEmployee,
};
