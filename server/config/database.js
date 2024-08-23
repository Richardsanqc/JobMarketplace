const mongoose = require("mongoose");
require("dotenv").config();

const datbase = process.env.MONGO_URI;

const connectDatabase = async () => {
  try {
    await mongoose.connect(datbase, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB has connected!");
  } catch (err) {
    console.log("MongoDB failed to connect!");
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDatabase;
