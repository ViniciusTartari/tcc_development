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
  gu_model: {
    // Modelo da unidade geradora (Se tiver)
    type: String,
    required: false
  },
  gu_microgrid: {
    // Identificador da microrrede que a unidade está vinculada
    type: String,
    required: false
  },
  gu_type: {
    // Solar, eólica ou PCH
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
  },
  gu_powerCurve: {
    /**
     * Curva de potência do gerador - Array de objetos
     * {
     *    in, // Valor lido do sensor
     *    out // Potência gerada com base no valor de entrada ("in")
     * }
     */
    type: Array,
    required: false
  },
  gu_active: {
    // Define se a unidade geradora esta ativa
    type: Boolean,
    required: false
  },
  gu_available: {
    // Define se a unidade geradora esta disponivel para gerar
    type: Boolean,
    required: false
  }
});

mongoose.model("GenerationUnit", GenerationUnitSchema);
