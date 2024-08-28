const mongoose = require("mongoose");

const joblistingSchema = new mongoose.Schema(
  {
    employer: {
        type: String,
        required: true,
    },
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    location: { 
        type: String, 
        required: true,
    },
    jobCategory: {
        type: String,
        required: true,
    },
    workType: {
        type: String,
        enum: ["full-time", "part-time", "contract-temp", "casual-vacation"],
        required: true,
    },
    pay: {
        type: String,
        enum: ["$0-$10,000", "$10,000-$20,000", 
            "$20,000-$40,000", "$40,000-$60,000", 
            "$60,000-$80,000", "$80,000-$100,000", 
            "$100,000-$120,000", "$120,000-$140,000", 
            "$140,000-$160,000", "$160,000-$180,000", 
            "$180,000-$200,000", "$200,000+"],
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Joblisting", joblistingSchema);
