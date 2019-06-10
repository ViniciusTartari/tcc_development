const mongoose = require("mongoose");

const Generation = mongoose.model("Generation");

module.exports = {
  /**
   * LOG - FUNCTIONS
   * Create and Read only
   */
  //Create
  async create(req, res) {
    const generation = await Generation.create(req.body);
    return res.json(generation);
  },

  //Read
  async read(req, res) {
    const generation = await Generation.find({}).sort({ createdAt: 1 });
    return res.json(generation);
  }
};
