const mongoose = require("mongoose");

const GenerationSchema = new mongoose.Schema({
  powerToGenerate: {
    type: Number,
    required: false
  },
  generatingTotal: {
    type: Number,
    required: false
  },
  powerGenerated: {
    type: Number,
    required: false
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now()
  }
});

mongoose.model("Generation", GenerationSchema);
