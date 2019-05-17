const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const WindGeneratorSchema = new mongoose.Schema({
  wg_model: {
    type: String,
    required: true
  },
  wg_manufacturer: {
    type: String,
    required: true
  },
  wg__microgrid: {
    type: String,
    required: true
  },

  //separar informacoes necessarias

  //Auto
  wg_createdAt: {
    type: Date,
    default: Date.now
  }
});

WindGeneratorSchema.plugin(mongoosePaginate);

mongoose.model("WindGenerator", WindGeneratorSchema);

/*
Número de pás
Diâmetro das pás
Tipo do gerador
Peso do gerador
Peso no topo da torre
Altura da torre
Faixa de velocidade de operação
Velocidade de vento de partida
Velocidade nominal de vento
Velocidade de vento de segurança
Rotação nominal das pás
Modo de controle de velocidade
Frenagem
Potência nominal
Potència máxima
Eficiência
Coeficiente de performance
*/
