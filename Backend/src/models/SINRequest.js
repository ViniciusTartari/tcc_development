const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const SINRequestSchema = new mongoose.Schema({
  sr_addedAt: {
    type: Date,
    required: true,
    default: Date.now()
  },
  sr_bodyRequest: {
    type: Array,
    required: true
  }
});

SINRequestSchema.plugin(mongoosePaginate);

mongoose.model("SINRequest", SINRequestSchema);
