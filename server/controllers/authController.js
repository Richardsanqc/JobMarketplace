const User = require("../models/user");
const { validationResult, check } = require("express-validator");
const sendTokenResponse = require("../utils/sendTokenResponse");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

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

// Reset Password
exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send("User not found");
  }

  // Generate reset code
  const resetCode = crypto.randomBytes(20).toString("hex");

  // Set reset code and expiration date
  user.resetPasswordToken = resetCode;
  user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

  await user.save();

  // Send email with reset code
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "jobhive76@gmail.com",
      pass: "GxLB2HHfL1AkevuT",
    },
  });

  const mailOptions = {
    to: user.email,
    from: "jobhive76@gmail.com",
    subject: "Password Reset",
    text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
    Please use the following code to reset your password:\n\n
    ${resetCode}\n\n
    This code will expire in 15 minutes.\n\n
    If you did not request this, please ignore this email and your password will remain unchanged.\n`,
  };

  await transporter.sendMail(mailOptions);

  res.status(200).send("Reset code sent to email");
};

// Vertify the Reset Code
exports.verifyResetCode = async (req, res) => {
  const { email, code } = req.body;

  // Find the user by email
  const user = await User.findOne({
    email,
    resetPasswordToken: code,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).send("Invalid or expired reset code");
  }

  res.status(200).send("Code verified");
};

// Reset User's Password
exports.resetPassword = async (req, res) => {
  const { email, code, newPassword } = req.body;

  // Find the user by email
  const user = await User.findOne({
    email,
    resetPasswordToken: code,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).send("Invalid or expired reset code");
  }

  // Update the password
  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  res.status(200).send("Password reset successful");
};
