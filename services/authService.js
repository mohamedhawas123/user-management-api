const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const JWT_SECRET = process.env.JWT_SECRET;

//register
const registerUser = async (name, email, password) => {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) throw new Error("Email already registered");

  const hashedPassword = await bcrypt.hash(password, 10);
  return await User.create({ name, email, password: hashedPassword });
};


//login
const loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password)))
    throw new Error("Invalid credentials");

  if (!user.verified) throw new Error("User not verified");

  user.loginCount += 1;
  user.lastLogin = new Date();
  await user.save();

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
  return { token, message: "Login successful" };
};


//verify
const verifyUser = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("User not found");

  user.verified = true;
  await user.save();
  return user;
};

module.exports = { registerUser, loginUser, verifyUser };
