// server/controllers/companyController.js

const CompanyProfile = require('../models/companyProfile');

exports.checkProfileExists = async (req, res) => {
  try {
    const userId = req.user._id; 
    const profile = await CompanyProfile.findOne({ userId });

    if (profile) {
      return res.json({ hasProfile: true });
    } else {
      return res.json({ hasProfile: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};
