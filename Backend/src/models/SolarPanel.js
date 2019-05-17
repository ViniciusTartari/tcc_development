const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const SolarPanelSchema = new mongoose.Schema({
  sp_model: {
    type: String,
    required: true
  },
  sp_manufacturer: {
    type: String,
    required: true
  },
  sp_microgrid: {
    type: String,
    required: true
  },

  //separar informacoes necessarias

  //Auto
  sp_createdAt: {
    type: Date,
    default: Date.now
  }
});

SolarPanelSchema.plugin(mongoosePaginate);

mongoose.model("SolarPanel", SolarPanelSchema);

/*
Potência máxima (Pmx) *
Tensão máxima (Vmp) *
Corrente máxima (Imp) *
Tensão de circuito aberto (Voc) *
Corrente de curto circuito (Isc) *
Eficiência *

Tipo de célula
Número de células
Dimensão
Peso
Vidro frontal
Tamanho do cabo
Dimensão (bitola) do cabo
Tipo de conector
Temperatura nominal de operação
Coeficiente Pmax
Coeficiente Voc
Coeficiente Isc
Temperatura operacional
Tensão máxima
Série de fusiveis máxima
Classe de operação

//Relevant information
  sp_pmx: {
    type: Number,
    required: true
  },
  sp_vmp: {
    type: Number,
    required: true
  },
  sp_imp: {
    type: Number,
    required: true
  },
  sp_voc: {
    type: Number,
    required: true
  },
  sp_isc: {
    type: Number,
    required: true
  },
  sp_efficiency: {
    type: Number,
    required: true
  },
*/
