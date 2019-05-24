const mongoose = require("mongoose");

const PowerCurveSchema = new mongoose.Schema({
  /**
   * Power Curve - Curva de potência
   * Curvas de potência de cada gerador das GU
   */
  pc_model: {
    // Identificador do modelo do gerador - Utilizado pra cruzar com os dados das GU
    type: String,
    required: true
  },
  pc_maxPower: {
    // Máxima potência [W]
    type: Number,
    required: false
  },
  gu_powerCurve: {
    // Curva de potência do gerador
    type: Object,
    required: true
  }
});

mongoose.model("PowerCurve", PowerCurveSchema);
