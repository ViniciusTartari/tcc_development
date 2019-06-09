const mongoose = require("mongoose");

const SINRequest = mongoose.model("SINRequest");

module.exports = {
  /*
   * CRUD
   */

  //Create
  async create(req, res) {
    const request = await SINRequest.create(req.body);
    return res.json(request);
  },

  //Read
  async read(req, res) {
    if ("id" in req.params) {
      const request = await SINRequest.findById(req.params.id);
      return res.json(request);
    } else {
      const request = await SINRequest.find({});
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
