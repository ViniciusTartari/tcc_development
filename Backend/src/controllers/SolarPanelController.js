const mongoose = require("mongoose");

const SP = mongoose.model("SolarPanel");

module.exports = {
  /**
   * CRUD
   */

  //Create
  async create(req, res) {
    const sp = await SP.create(req.body);
    return res.json(sp);
  },

  //Read
  async read(req, res) {
    if ("id" in req.params) {
      const sp = await SP.findById(req.params.id);
      return res.json(sp);
    } else {
      const sp = await SP.find({});
      return res.json(sp);
    }
  },

  //Update
  async update(req, res) {
    const sp = await SP.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    return res.json(sp);
  },

  //Delete
  async delete(req, res) {
    const sp = await SP.findByIdAndDelete(req.params.id);

    return res.send();
  }

  /*
   * Others functions...
   */
};
