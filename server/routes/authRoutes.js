const express = require("express");
const {
  home,
  register,
  login,
  logout,
  getUserProfile,
} = require("../controllers/authController");

const router = express.Router();

// router.get("/", home);
// router.post("/register", register);
// router.post("/login", login);
// router.get("/logout", logout);
// router.get("/profile", getUserProfile);

module.exports = router;
