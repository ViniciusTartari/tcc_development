const mongoose = require("mongoose");

const MeterSchema = new mongoose.Schema({
  m_model: {
    type: String,
    required: true
  },
  m_type: {
    type: String,
    required: true
  },
  m_microgrid: {
    type: String,
    required: true
  },
  m_value: {
    type: Number,
    required: false
  }
});

mongoose.model("Meter", MeterSchema);
