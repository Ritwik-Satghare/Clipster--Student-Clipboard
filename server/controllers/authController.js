const userModel = require("../models/userModel");
const { passwordHash, comparePass } = require("../helpers/auth");
const { compare } = require("bcrypt");
const jwt = require("jsonwebtoken");

const test = (req, res) => {
  res.status(200).json({ message: "Success" });
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // to check if password is less than six character long
    if (password.length < 6)
      return res.status(400).json({
        error: "Password too short",
      });

    // to check if the email is taken already
    const exist = await userModel.findOne({ email });
    if (exist)
      return res.status(400).json({
        error: "email already exists",
      });

    // now when everything is correct hash password
    const hashedPass = await passwordHash(password);
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPass,
    });
    res.status(200).json({
      success: "Registeration successful, Welcome!",
      User: newUser,
    });
  } catch (error) {
    console.log("please fix this :" + error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }
    const authenticated = await comparePass(password, user.password);
    if (!authenticated) {
      return res.status(401).json({
        error: "Password was incorrect",
      });
    }
    jwt.sign(
      { name: user.name, email: user.email, id: user._id },
      process.env.JWT_KEY,
      {},
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token, {
          httpOnly: false, // JS cannot access it → more secure
          sameSite: "lax", // allows cross-site requests from your frontend
          secure: false, // true if using HTTPS; false for localhost
          maxAge: 24 * 60 * 60 * 1000, // 1 day in ms, optional
        });

        return res.status(200).json({
          success: "login successful",
          user: user,
        });
      }
    );
  } catch (error) {
    console.log("Please fix this" + error);
  }
};

module.exports = { test, registerUser, loginUser };
