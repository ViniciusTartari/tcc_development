const mongoose = require("mongoose");

const Log = mongoose.model("Log");

module.exports = {
  /**
   * LOG - FUNCTIONS
   * Create and Read only
   */
  //Create
  async create(req, res) {
    const log = await Log.create(req.body);
    return res.json(log);
  },

  //Read
  async read(req, res) {
    if ("id" in req.params) {
      const log = await Log.findById(req.params.id);
      return res.json(log);
    } else {
      const log = await Log.find({});
      return res.json(log);
    }
  },

  // Get by type
  async getByType(req, res) {
    const log = await Log.find({
      log_type: req.params.type
    });
    if (log.length == 0) {
      return res.sendStatus(404);
    }

    return res.json(log);
  },

  // Get by generation unit name
  async getByGU(req, res) {
    const log = await Log.find({
      log_guName: req.params.guName
    });
    if (log.length == 0) {
      return res.sendStatus(404);
    }

    return res.json(log);
  }
};
