const bcrypt = require("bcryptjs");
const { generateJWT } = require("../middleware/jwt");
const Employee = require("../models/Employee");
const User = require("../models/User");

const GetUserInfo = async (req, res) => {
  try {
    //* Search for User and take out the password for not showing as a result
    const employee = await Employee.findById(req.user.id);
    const user = await User.findById(employee.coduser).select("-password");
    const { name, lastname, role, dni } = employee;
    const { avatar } = user;
    res.json({
      name,
      lastname,
      role,
      dni,
      avatar,
    });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [user] = await User.find({ email }).exec();
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credencials" }] });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credencials" }] });
    }
    const token = await generateJWT(user._id);
    return res.json({
      status: "OK",
      msg: "User logged",
      token,
    });
  } catch (error) {
    return res.status(500).send("Server error");
  }
};

module.exports = {
  GetUserInfo,
  Login,
};
