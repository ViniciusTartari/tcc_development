const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const LogSchema = new mongoose.Schema({
  // Type - Connection, disconnection, sub, pub ...
  log_type: {
    type: String,
    required: true
  },
  log_generator: {
    type: String,
    required: false
  },
  log_meter: {
    type: String,
    required: false
  },
  log_microgrid: {
    type: String,
    required: false
  },
  // User - Usuario(plataforma) que enviou a requisicao
  log_user: {
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
  //parametros enviados...
  //maybe...messageId da requisicao mqtt?
});

LogSchema.plugin(mongoosePaginate);

mongoose.model("Log", LogSchema);
