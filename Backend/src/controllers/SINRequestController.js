const mongoose = require("mongoose");

const SINRequest = mongoose.model("SINRequest");

const optimizer = require("../optimizer");

module.exports = {
  /*
   * CRUD
   */

  //Create
  async create(req, res) {
    const request = await SINRequest.create(req.body);

    // Dispara o otimizador
    // const optimized = await optimizer.handleRequest(request);
    optimizer.handleRequest(request);

    return res.json(request);
  },

  //Read
  async read(req, res) {
    if ("id" in req.params) {
      const request = await SINRequest.findById(req.params.id);
      return res.json(request);
    } else {
      const request = await SINRequest.find({}).sort({ sr_addedAt: -1 });
      return res.json(request);
    }
  },

  //Update
  async update(req, res) {
    const request = await SINRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    );

    return res.json(request);
  },

  //Delete
  async delete(req, res) {
    const request = await SINRequest.findByIdAndDelete(req.params.id);

    return res.send();
  }

  /*
   * Others functions...
   */
};
