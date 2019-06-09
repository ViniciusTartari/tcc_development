const mongoose = require("mongoose");

const GenerationUnit = mongoose.model("GenerationUnit");

module.exports = {
  // Create
  async create(req, res) {
    const exist = await GenerationUnit.find({ gu_name: req.body.gu_name });
    if (exist.length == 0) {
      const generationunit = await GenerationUnit.create(req.body);
      return res.json(generationunit);
    }

    return res.send("Erro: Unidade geradora já cadastrada!");
  },

  // Read (with and without params)
  async read(req, res) {
    if ("id" in req.params) {
      const generationunit = await GenerationUnit.findById(req.params.id);
      return res.json(generationunit);
    } else {
      const generationunit = await GenerationUnit.find({});
      return res.json(generationunit);
    }
  },

  // Update
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

  // Delete
  async delete(req, res) {
    const generationunit = await GenerationUnit.findByIdAndDelete(
      req.params.id
    );

    return res.send(generationunit.gu_name + " deletada com sucesso!");
  },

  // Get by name
  async getByName(req, res) {
    const generationunit = await GenerationUnit.find({
      gu_name: req.params.name
    });
    if (generationunit.length == 0) {
      return res.sendStatus(404);
    }

    return res.json(generationunit);
  },

  // Get by model
  async getByModel(req, res) {
    const generationunit = await GenerationUnit.find({
      gu_model: req.params.model
    });
    if (generationunit.length == 0) {
      return res.sendStatus(404);
    }

    return res.json(generationunit);
  },

  // Get by microgrid
  async getByMicrogrid(req, res) {
    const generationunit = await GenerationUnit.find({
      gu_microgrid: req.params.microgrid
    });
    if (generationunit.length == 0) {
      return res.sendStatus(404);
    }

    return res.json(generationunit);
  },

  // Get GU actives
  async actives(req, res) {
    const generationunit = await GenerationUnit.find({
      gu_active: req.params.status
    });
    return res.json(generationunit);
  },

  //Get GU availables
  async availables(req, res) {
    const generationunit = await GenerationUnit.find({
      gu_available: req.params.status
    });
    return res.json(generationunit);
  }
};

/**
 * Banco de pesquisas - MONGODB
 */

// db.getCollection('generationunits').aggregate([
//   {$group:{_id: "$gu_microgrid", totalPower: {$sum: "$gu_maxPower"}}},
//   {$sort: {_id: 1}}
// ])
