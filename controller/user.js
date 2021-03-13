const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../models/User");
const Employee = require("../models/Employee");

const GetAllUser = async (req, res) => {
  try {
    const users = await User.find().exec();
    return res.json({
      users,
    });
  } catch (error) {
    return res.status(500).send("Server error");
  }
};

const SelectUserbyId = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    return res.json({
      user,
    });
  } catch (error) {
    return res.status(500).send("Server error");
  }
};

const RegisterUser = async (req, res) => {
  const { password, employee: employeeId } = req.body;
  try {
    const employeeExists = await Employee.exists({
      _id: employeeId,
      status: 1,
    });
    if (!employeeExists) {
      return res.status(500).send("Employee doesn't exists");
    }
    const { coduser, email } = await Employee.findById(employeeId);
    //* Get users gravatar
    if (coduser) {
      return res.status(500).send("Employee already has an account");
    }
    const avatar = gravatar.url(email, {
      s: "200",
      r: "pd",
      d: "mm",
    });
    user = new User({
      avatar,
      password,
    });
    //* Encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt); //* Hashing password
    await user.save();
    await Employee.findByIdAndUpdate(
      employeeId,
      {
        coduser: user._id,
      },
      { new: true }
    );
    //* Return JWT (jsonwebtoken)
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error" + err);
  }
};

const UpdateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { password, newpassword } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(500).send("User doesn't exist");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).send("Your password is incorrect");
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newpassword, salt); //* Hashing password
    const userUpdated = await User.findByIdAndUpdate(
      id,
      {
        password: hashPassword,
      },
      { new: true }
    );
    return res.json({
      status: "OK",
      msg: "User data updated",
      user: userUpdated,
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const DeleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      res.status(500).send("User doesn't exist");
    }
    const employee = await Employee.find({ coduser: id, status: 1 });
    if (!employee) {
      res.status(500).send("There are no employees with this account");
    }
    await Employee.findOneAndUpdate(
      {
        coduser: id,
      },
      {
        coduser: null,
      },
      { new: true }
    );
    await user.delete();
    return res.json({
      status: "OK",
      msg: "User was deleted",
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

module.exports = {
  GetAllUser,
  SelectUserbyId,
  RegisterUser,
  UpdateUser,
  DeleteUser,
};
