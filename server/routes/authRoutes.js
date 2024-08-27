const express = require("express");
const {
  register,
  login,
  logout,
  getUserProfile,
  requestPasswordReset,
  verifyResetCode,
  verifyResetCode,
} = require("../controllers/authController");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/dashboard", authenticate, getUserProfile);
router.post("/request-password-reset", requestPasswordReset);
router.post("/verify-reset-code", verifyResetCode);
router.post("/reset-password", resetPassword);

module.exports = router;
