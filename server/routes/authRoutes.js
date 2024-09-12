const express = require("express");
const { register, login, logout, getUserProfile } = require("../controllers/authController");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/dashboard", authenticate, getUserProfile);

// Auth routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
