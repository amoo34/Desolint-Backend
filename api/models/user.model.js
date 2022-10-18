// importing required modules
const mongoose = require(`mongoose`);

// defining user schema
const userSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      lowercase:true
    },
    password: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

// exporting schema model as a module
module.exports = mongoose.model("User", userSchema, `User`);
