const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authenticate = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
      next();
    } catch (error) {
      // If token verification fails then return an unauthorised error
      return res.status(401).json({ msg: "Authentication failed!" });
    }
  } else {
    // If no token is found then return an unauthorised error
    return res.status(401).json({ msg: "No token found, access is denied." });
  }
};

module.exports = authenticate;
