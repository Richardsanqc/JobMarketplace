const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  getCompanyProfile,
  updateCompanyProfile,
} = require("../controllers/profileController");
const { checkProfileExists } = require("../controllers/companyController");
const authenticate = require("../middleware/authMiddleware");


router.get("/user/:userId", authenticate, getUserProfile);
router.put("/user/:userId", authenticate, updateUserProfile);


router.get("/company/:companyId", authenticate, getCompanyProfile);
router.put("/company/:companyId", authenticate, updateCompanyProfile);


router.get('/check-profile', authenticate, checkProfileExists);

module.exports = router;
