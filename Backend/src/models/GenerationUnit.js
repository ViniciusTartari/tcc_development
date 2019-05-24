const mongoose = require("mongoose");

const GenerationUnitSchema = new mongoose.Schema({
  /**
   * Generation Unit - Unidade de geração
   * Subdividida em duas categorias:
   * Power Conversion System
   *    Gerador em si, recebe os parâmetros de geração
   * Meters
   *    Sensor da unidade, envia os parâmetros para a interface
   */
  gu_name: {
    // Identificador da unidade geradora
    type: String,
    required: true
  },
  gu_microgrid: {
    // Identificador da microrrede que a unidade está
    type: String,
    required: true
  },
  gu_type: {
    // Solar, eólica ou PCH
    type: String,
    required: false
  },
  gu_model: {
    // Modelo do gerador para cruzar informações com a tabela do otimizador
    type: String,
    required: false
  },
  gu_maxPower: {
    // Máxima potência [W]
    type: Number,
    required: false
  },
  gu_meter: {
    /**
     * Se type = solar
     *   resposta em irradiação [W/m2]
     * Se type = wind
     *   resposta em velocidade de vento [m/s]
     * Se type = pch (((Verificar)))
     *   resposta em altura de água de reservatório [m]
     */
    type: Number,
    required: false
  }
});

mongoose.model("GenerationUnit", GenerationUnitSchema);
