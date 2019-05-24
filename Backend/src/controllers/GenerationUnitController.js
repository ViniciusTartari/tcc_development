const mongoose = require("mongoose");

const GenerationUnit = mongoose.model("GeneratingUnit");

module.exports = {
  /*
   * CRUD
   */

  //Create
  async create(req, res) {
    const exist = await GenerationUnit.find({ gu_name: req.body.gu_name });
    if (exist.length == 0) {
      const generationunit = await GenerationUnit.create(req.body);
      return res.json(generationunit);
    }

    return res.send("Erro: Unidade geradora já cadastrada!");
  },

  //Read
  async read(req, res) {
    if ("id" in req.params) {
      const generationunit = await GenerationUnit.findById(req.params.id);
      return res.json(generationunit);
    } else {
      const generationunit = await GenerationUnit.find({});
      return res.json(generationunit);
    }
  },

  //Update
  async update(req, res) {
    const generationunit = await GenerationUnit.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    );

    return res.json(generationunit);
  },

  //Delete
  async delete(req, res) {
    const generationunit = await GenerationUnit.findByIdAndDelete(
      req.params.id
    );

    return res.send();
  }

  /*
   * Others functions...
   */
};
