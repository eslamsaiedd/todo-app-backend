const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//!register
const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const oldUser = await User.findOne({ email: email });

  //!if the user already exists
  if (oldUser) {
    return res.status(400).json("user already exists");
  }

  // hashing password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  // generate token
  const jwt_secret_key = process.env.jwt_secret_key;

  const token = jwt.sign(
    { email: newUser.email, id: newUser._id },
    jwt_secret_key,
    { expiresIn: "10m" }
  );

  newUser.token = token;

  await newUser.save();

  res.status(201).json({ status: "SUCCESS", data: { user: newUser } });
};

//!login
const login = async (req, res) => {
  const { email, password } = req.body;

  //* if the client didn't write the email or password
  if (!email || !password) {
    return res
      .status(400)
      .json({ status: "FAIL", message: "email and password are required" });
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(400).json({ status: "FAIL", message: "user not found" });
  }

  const matchedPassword = await bcrypt.compare(password, user.password);

  if (user && matchedPassword) {
    //*logged in successfully
    const jwt_secret_key = process.env.jwt_secret_key;

    const token = await jwt.sign(
      { email: email, id: user._id },
      jwt_secret_key,
      { expiresIn: "10m" }
    );
    return res.status(200).json({ status: "SUCCESS", data: { token }});
  } else {
    return res
      .status(400)
      .json({ status: "ERROR", message: "something went wrong" });
  }
};

//!account
const me = async (req, res) => {

    try {
    const userId = req.user.id; // لازم يكون موجود بعد الـ auth middleware

    const user = await User.findById(userId).select('-password'); // مانجيبش الباسورد
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }

}

module.exports = {
  register,
  login, 
  me
};
