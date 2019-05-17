const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const LogSchema = new mongoose.Schema({
  log_generator: {
    type: String,
    required: true
  },
  log_microgrid: {
    type: String,
    required: true
  },
  log_user: {
    type: String,
    required: true
  }
  //parametros enviados...
  //maybe...messageId da requisicao mqtt?
});

LogSchema.plugin(mongoosePaginate);

mongoose.model("Log", LogSchema);
