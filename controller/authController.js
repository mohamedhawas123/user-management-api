const { validationResult } = require("express-validator");
const authService = require("../services/authService");

const handleRequest = async (req, res, serviceFunction) => {
  try {
    const result = await serviceFunction();
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// **Register User**
exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, email, password } = req.body;
  handleRequest(req, res, () => authService.registerUser(name, email, password));
};

// **Login User**
exports.loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;
  handleRequest(req, res, () => authService.loginUser(email, password));
};

// **Verify User**
exports.verifyUser = async (req, res) => {
  const { email } = req.body;
  handleRequest(req, res, () => authService.verifyUser(email));
};
