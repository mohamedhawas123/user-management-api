const User = require("../models/user");

// **Get User by ID**
const getUserById = async (id) => {
  const user = await User.findByPk(id, { attributes: { exclude: ["password"] } });
  if (!user) throw new Error("User not found");
  return user;
};

// **Update User**
const updateUser = async (id, name, email) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error("User not found");

  user.name = name || user.name;
  user.email = email || user.email;
  await user.save();
  return user;
};

// **Delete User**
const deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error("User not found");

  await user.destroy();
  return { message: "User deleted" };
};

// **Get All Users with Filtering**
const getAllUsers = async (filters) => {
  return await User.findAll({ where: filters, attributes: { exclude: ["password"] } });
};

module.exports = { getUserById, updateUser, deleteUser, getAllUsers };
