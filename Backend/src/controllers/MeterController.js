const mongoose = require("mongoose");

const Meter = mongoose.model("Meter");

module.exports = {
  /*
   * CRUD
   */

  //Create
  async create(req, res) {
    const exist = await Meter.find({ u_email: req.body.u_email });
    if (exist.length == 0) {
      const meter = await Meter.create(req.body);
      return res.json(meter);
    }

    //testar
    return res.send("Erro: Medidor já cadastrado!");
  },

  //Read
  async read(req, res) {
    if ("id" in req.params) {
      const user = await Meter.findById(req.params.id);
      return res.json(user);
    } else {
      const user = await Meter.find({});
      return res.json(user);
    }
  },

  //Update
  async update(req, res) {
    const user = await Meter.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    return res.json(user);
  },

  //Delete
  async delete(req, res) {
    const user = await Meter.findByIdAndDelete(req.params.id);

    return res.send();
  }

  /*
   * Others functions...
   */
};
