// importing required modules
const mongoose = require(`mongoose`);

// defining user schema
const carSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    model: {
      type: String,
      trim: true,
      required: true,
    },
    price: {
      type: String,
      trim: true,
      required: true,
    },
    phone: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    copies: {
        type: String,
        required:true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    images: {
        type: [String],
        // required: true
    }

  },
  {
    timestamps: true,
  }
);

// exporting schema model as a module
module.exports = mongoose.model("Car", carSchema, `Car`);
