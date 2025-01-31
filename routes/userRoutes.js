const express = require("express");
const userController = require("../controller/userController");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:id", authenticate, userController.getUserById);
router.put("/:id", authenticate, userController.updateUser);
router.delete("/:id", authenticate, userController.deleteUser);
router.get("/", authenticate, userController.getAllUsers);

module.exports = router;
