const gravatar = require("gravatar");
const { generateJWT } = require("../../middleware/jwt");
const UserClient = require("../../models/client/UserClient");
const bcrypt = require("bcryptjs");

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [userClient] = await UserClient.find({ email }).exec();
    if (!userClient) {
      res.status(500).send("Invalid credentials");
    }
    const isMatch = await bcrypt.compare(password, userClient.password);
    if (!isMatch) {
      res.status(500).send("Invalid credentials");
    }
    const token = await generateJWT(userClient._id);
    res.json({
      status: "OK",
      msg: "User logged",
      token,
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const RegisterAccount = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const avatar = gravatar.url(email, {
      s: "200",
      r: "pd",
      d: "mm",
    });
    const userClient = new UserClient({ name, email, password, avatar });
    const salt = await bcrypt.genSalt(10);
    userClient.password = await bcrypt.hash(password, salt); //* Hashing password
    await userClient.save();
    const { _id: id } = userClient;
    const token = await generateJWT(id);
    res.json({
      status: "OK",
      msg: "User is registered",
      token,
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(500).send("User is already registered");
    }
    res.status(500).send("Server error");
  }
};

const GetUserData = async (req, res) => {
  try {
    const { id } = req.user;
    const userClient = await UserClient.findById(id).exec();
    if (!userClient) {
      res.status(500).send("User doesn't exists");
    }
    const { name, email, avatar } = userClient;
    res.json({ name, email, avatar });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

module.exports = {
  Login,
  RegisterAccount,
  GetUserData,
};
