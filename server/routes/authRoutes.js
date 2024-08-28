const express = require("express");
const {
  register,
  login,
  logout,
  requestPasswordReset,
  resetPassword,
  validateResetToken,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/request-password-reset", requestPasswordReset);
router.post("/reset-password", resetPassword);
router.post("/validate-reset-token", validateResetToken);

module.exports = router;
