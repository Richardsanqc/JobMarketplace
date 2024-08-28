const express = require("express");
const {
  getJobs,
  getJobDetails,
  createJob,
  applyToJob,
} = require("../controllers/jobController");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getJobs);
router.get("/:jobId", getJobDetails);
router.post("/create", authenticate, createJob);
router.post("/:jobId/apply", authenticate, applyToJob);

module.exports = router;
