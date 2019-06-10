const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const LogSchema = new mongoose.Schema({
  // Type - Connection, disconnection, sub, pub ...
  log_type: {
    type: String,
    required: true
  },
  log_guName: {
    type: String,
    required: false
  },
  log_guMeter: {
    type: String,
    required: false
  },
  // Connection e disconnection
  log_client: {
    type: String,
    required: false
  },
  log_messageId: {
    type: String,
    required: false
  },
  log_topic: {
    type: String,
    required: false
  },
  log_payload: {
    type: String,
    required: false
  },

  log_date: {
    type: Date,
    required: true,
    default: Date.now()
  }
});

LogSchema.plugin(mongoosePaginate);

mongoose.model("Log", LogSchema);
