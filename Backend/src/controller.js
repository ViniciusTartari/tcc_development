const mongoose = require("mongoose");
const mqtt = require("mqtt");
const axios = require("axios");

const GenerationUnit = mongoose.model("GenerationUnit");
const Generation = mongoose.model("Generation");

const Log = mongoose.model("Log");

// Configuracao do cliente MQTT - ADD EXPLICACAO DE CADA LINHA
client_options = {
  clientId: "Controlador",
  clean: true,
  qos: 0 //0, 1, 2
};
// Inicia o cliente MQTT
const clientMQTT = mqtt.connect("mqtt://localhost", client_options);

module.exports = {
  /**
   * Optimizer
   */
  async handleRequest(req) {
    const generationRequest = req;
    var powerToGenerate,
      powerGenerated = 0,
      cicles = 0;

    // Pega qual a quantidade que deve ser gerada pela hora atual
    const hora = new Date(Date.now());
    generationRequest.sr_bodyRequest.map(req => {
      let comp = hora.getHours() + ":";
      if (hora.getMinutes() > 30) comp = hora.getHours() + 1 + ":00";
      else comp = hora.getHours() + ":30";

      if (req.horario == comp) {
        powerToGenerate = req.potencia;
      }
    });

    // Verifica se eh possivel
    const totalpower = await axios
      .request({
        method: "get",
        url: "http://localhost:3000/api/totalpower"
      })
      .catch(err => console.log(err));

    if (powerToGenerate > totalpower.data[0].totalPower / 2) {
      console.log(
        "Requisicao negada: Demanda maior do que a maxima geracao possivel!\n" +
          "Demanda = " +
          powerToGenerate +
          " - Maximo = " +
          totalpower.data[0].totalPower / 2 +
          "\n---------------------------\n"
      );
      clearInterval(loop);
    } else {
      console.log("Requisicao aceita! Demanda = " + powerToGenerate);

      // Pega todas as unidades ativas e calcula a geracao atual delas
      var loop = setInterval(async function() {
        var GUs = await GenerationUnit.find({
          gu_available: true
        });
        var generating = 0;
        GUs.map(gu => {
          gu.gu_powerCurve.map(pc => {
            if (pc.in == Math.trunc(gu.gu_meter)) {
              GenerationUnit.findByIdAndUpdate(
                gu._id,
                {
                  gu_generating: pc.out / 720, //720 -> 5 seg de geracao - pc.out refere-se a 1 hr de geracao
                  gu_active: true
                },
                {
                  new: true
                }
              ).catch(err => console.log(err));
              clientMQTT.publish(
                `microgrid/${gu.gu_microgrid}/gunit/${gu.gu_name}/generate`,
                "" + pc.out
              );
              generating += pc.out / 720;
            }
          });
        });

        var obj = {
          powerToGenerate: powerToGenerate,
          generatingTotal: generating,
          powerGenerated: powerGenerated
        };

        cicles += 1;

        // Exibicao do terminal
        console.log(
          "\nRequisicao = " +
            powerToGenerate +
            "\nGeracao atual = " +
            generating.toFixed(2) +
            "\nGeracao total = " +
            powerGenerated.toFixed(2) +
            "\nCiclos = " +
            cicles +
            "\nTempo decorrido = " +
            cicles * 5 +
            " segundos" +
            "\nPercentual = " +
            ((powerGenerated * 100) / powerToGenerate).toFixed(2) +
            "%\n"
        );
        Generation.create(obj);

        // Log simples
        Log.create({
          log_type: "Generation",
          log_payload: "" + generating
        });

        powerGenerated += generating;

        // Verifica se terminou
        if (powerGenerated > powerToGenerate) {
          clearInterval(loop);
          console.log("Potencia gerada: " + powerGenerated.toFixed(2));
          console.log("Finish");
          GUs.map(gu => {
            GenerationUnit.findByIdAndUpdate(
              gu._id,
              {
                gu_active: false,
                gu_generating: 0
              },
              {
                new: true
              }
            ).catch(err => console.log(err));
          });
        }
        // Verifica se tem unidades online
        else if (generating == 0) {
          clearInterval(loop);
          console.log("Nenhuma unidade ativa/gerando!");
        }
      }, 5000);
    }
  }
};
