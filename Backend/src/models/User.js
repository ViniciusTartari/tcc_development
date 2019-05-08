const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  u_firstName: {
    type: String,
    required: true
  },
  u_lastName: {
    type: String,
    required: true
  },
  u_email: {
    type: String,
    required: true
  },
  u_password: {
    type: String,
    required: true
  }
});

mongoose.model("User", UserSchema);
