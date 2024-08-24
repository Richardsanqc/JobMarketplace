const express = require("express");
const {
  register,
  login,
  logout,
  getUserProfile,
} = require("../controllers/authController");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/dashboard", authenticate, getUserProfile);

module.exports = router;
