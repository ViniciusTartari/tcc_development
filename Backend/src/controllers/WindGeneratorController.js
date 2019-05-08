const mongoose = require("mongoose");

const WG = mongoose.model("WindGenerator");

module.exports = {
  /**
   * CRUD
   */

  //Create
  async create(req, res) {
    const wg = await WG.create(req.body);
    return res.json(wg);
  },

  //Read
  async read(req, res) {
    if ("id" in req.params) {
      const wg = await WG.findById(req.params.id);
      return res.json(wg);
    } else {
      const wg = await WG.find({});
      return res.json(wg);
    }
  },

  //Update
  async update(req, res) {
    const wg = await WG.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    return res.json(wg);
  },

  //Delete
  async delete(req, res) {
    const wg = await WG.findByIdAndDelete(req.params.id);

    return res.send();
  }

  /*
   * Others functions...
   */
};
