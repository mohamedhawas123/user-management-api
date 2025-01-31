const userService = require("../services/userService");

// Helper Function to Handle Errors
const handleRequest = async (req, res, serviceFunction) => {
  try {
    const result = await serviceFunction();
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  handleRequest(req, res, () => userService.getUserById(req.params.id));
};

exports.updateUser = async (req, res) => {
  const { name, email } = req.body;
  handleRequest(req, res, () => userService.updateUser(req.params.id, name, email));
};

exports.deleteUser = async (req, res) => {
  handleRequest(req, res, () => userService.deleteUser(req.params.id));
};

exports.getAllUsers = async (req, res) => {
  const filters = {};
  if (req.query.name) filters.name = { [Op.like]: `%${req.query.name}%` };
  if (req.query.email) filters.email = { [Op.like]: `%${req.query.email}%` };
  if (req.query.verified !== undefined) filters.verified = req.query.verified === "true";

  handleRequest(req, res, () => userService.getAllUsers(filters));
};
