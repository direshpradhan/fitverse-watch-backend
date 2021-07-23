require("dotenv").config();
const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUserData = async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.json({ success: true, users: allUsers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const loginWithCredentials = async (req, res) => {
  console.log("entered login");
  const { email, password } = req.body;
  console.log({ email, password });
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          "User with given email Id doesn't exist. Sign up to continue!!",
      });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      const token = jwt.sign(
        { user: { userId: user._id } },
        process.env.SECRET_ACCESS_KEY,
        { expiresIn: "1d" }
      );
      console.log(token);
      return res.status(201).json({
        success: true,
        message: "Logged In successfully",
        token,
        user,
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "Wrong Password. Please try again later",
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const signUpHandler = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (user) {
      return res.status(403).json({
        success: false,
        message:
          "User with the entered email already exists. Please use a different email id",
      });
    }
    const newUser = new User({ name, email, password });
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    const savedUser = await newUser.save();
    const token = jwt.sign(
      { user: { userId: newUser._id } },
      process.env.SECRET_ACCESS_KEY,
      { expiresIn: "1d" }
    );
    console.log(token);
    res.status(201).json({
      success: true,
      message: "New user created",
      user: savedUser,
      token,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { loginWithCredentials, signUpHandler, getUserData };
