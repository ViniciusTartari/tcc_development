const mongoose = require("mongoose");

const User = mongoose.model("User");

module.exports = {
  /*
   * CRUD
   */

  //Create
  async create(req, res) {
    const exist = await User.find({ u_email: req.body.u_email });
    if (exist.length == 0) {
      const user = await User.create(req.body);
      return res.json(user);
    }

    //testar
    return res.send("Erro: Email já cadastrado!");
  },

  //Read
  async read(req, res) {
    if ("id" in req.params) {
      const user = await User.findById(req.params.id);
      return res.json(user);
    } else {
      const user = await User.find({});
      return res.json(user);
    }
  },

  //Update
  async update(req, res) {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    return res.json(user);
  },

  //Delete
  async delete(req, res) {
    const user = await User.findByIdAndDelete(req.params.id);

    return res.send();
  }

  /*
   * Others functions...
   */
};
