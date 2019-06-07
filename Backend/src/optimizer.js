const mongoose = require("mongoose");

const GenerationUnit = mongoose.model("GenerationUnit");
const Log = mongoose.model("Log");

module.exports = {
  /**
   * Optimizer
   */
  async handleRequest(req, res) {
    const generationRequest = req.body;
    //const log = await Log.create(req.body);

    console.log(generationRequest);
    return res.sendStatus(200);
  }
};

//exemplo de envio via terminal
//mqtt pub -t 'microgrid/mg3/gunit/gu1/generate' -h 'localhost' -p 1883 -v -i a -m "1000"
