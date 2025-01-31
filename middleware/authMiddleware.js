const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

// **Authentication Middleware**
const authenticate = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid token." });
  }
};

module.exports = authenticate;
