const express = require("express");
const { body } = require("express-validator");
const authController = require("../controller/authController");

const router = express.Router();

router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  authController.registerUser
);

router.post("/login", [body("email").isEmail(), body("password").notEmpty()], authController.loginUser);
router.patch("/verify", [body("email").isEmail()], authController.verifyUser);

module.exports = router;
