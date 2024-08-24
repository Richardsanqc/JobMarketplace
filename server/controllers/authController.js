const User = require("../models/user");
const { validationResult, check } = require("express-validator");
const sendTokenResponse = require("../utils/sendTokenResponse");

// Validation rules
const registerValidationRules = [
  check("email", "Please provide a valid email").isEmail(),
  check("password", "Password must be 8 characters long.").isLength({ min: 8 }),
  check("role", "Role is required").notEmpty().isIn(["jobSeeker", "employer"]),
];

const loginValidationRules = [
  check("email", "Please provide a valid email").isEmail(),
  check("password", "Password is required").exists(),
];

// Register User
exports.register = [
  registerValidationRules,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, role } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      user = new User({ email, password, role });
      await user.save();

      // Send token and response
      sendTokenResponse(user, 201, res);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ errors: [{ msg: "Server error" }] });
    }
  },
];

// Login User
exports.login = [
  loginValidationRules,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const email = req.body.email.toLowerCase();
    const { password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user || !(await user.comparePassword(password))) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      // Send token and response via cookie
      sendTokenResponse(user, 200, res);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ errors: [{ msg: "Server error" }] });
    }
  },
];

// Logout User
exports.logout = (req, res) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ success: true });
};

// Get User Profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ errors: [{ msg: "User not found" }] });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
};
