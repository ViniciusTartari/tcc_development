const mongoose = require("mongoose");

const PowerCurve = mongoose.model("PowerCurve");

module.exports = {
  /*
   * CRUD
   */

  //Create
  async create(req, res) {
    const exist = await PowerCurve.find({ pc_model: req.body.gu_model });
    if (exist.length == 0) {
      const powercurve = await PowerCurve.create(req.body);
      return res.json(powercurve);
    }

    return res.send("Erro: Modelo de gerador já cadastrado!");
  },

  //Read
  async read(req, res) {
    if ("id" in req.params) {
      const powercurve = await PowerCurve.findById(req.params.id);
      return res.json(powercurve);
    } else {
      const powercurve = await PowerCurve.find({});
      return res.json(powercurve);
    }
  },

  //Update
  async update(req, res) {
    const powercurve = await PowerCurve.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    );

    return res.json(powercurve);
  },

  //Delete
  async delete(req, res) {
    const powercurve = await PowerCurve.findByIdAndDelete(req.params.id);

    return res.send();
  }

  /*
   * Others functions...
   */
};
