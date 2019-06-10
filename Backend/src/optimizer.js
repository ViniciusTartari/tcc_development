const mongoose = require("mongoose");
const mqtt = require("mqtt");

const GenerationUnit = mongoose.model("GenerationUnit");
const Generation = mongoose.model("Generation");

const Log = mongoose.model("Log");

// Configuracao do cliente MQTT - ADD EXPLICACAO DE CADA LINHA
client_options = {
  clientId: "Otimizador",
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
      powerGenerated = 0;

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

    // Pega todas as unidades ativas e calcula a geracao atual delas
    // BEGIN
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
                gu_generating: pc.out,
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
            generating += pc.out;
          }
        });
      });

      var obj = {
        powerToGenerate: powerToGenerate,
        generatingTotal: generating,
        powerGenerated: powerGenerated
      };

      console.log(obj);
      Generation.create(obj);

      // Log simples
      Log.create({
        log_type: "Generation",
        log_payload: "" + generating
      });

      powerGenerated += generating;
      if (powerGenerated > powerToGenerate) {
        clearInterval(loop);
        console.log("Potencia gerada: " + powerGenerated);
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
      } else if (generating == 0) {
        clearInterval(loop);
        console.log("Nenhuma unidade ativa/gerando!");
      }
    }, 5000);
  }
};

//exemplo de envio via terminal
//mqtt pub -t 'microgrid/mg3/gunit/gu1/generate' -h 'localhost' -p 1883 -v -i a -m "1000"

/*
var GUs = await GenerationUnit.find({
      gu_available: true
    });
    var generating = 0;
    GUs.map(gu => {
      generating += gu.gu_generating;
      gu.gu_powerCurve.map(pc => {
        if (pc.in == Math.trunc(gu.gu_meter)) {
          GenerationUnit.findByIdAndUpdate(
            gu._id,
            {
              gu_generating: pc.out
            },
            {
              new: true
            }
          ).catch(err => console.log(err));
        }
      });
    });
    console.log(
      "Potencia a ser gerada: " +
        powerToGenerate +
        "\n" +
        "Capacidade atual das unidades geradoras disponiveis: " +
        generating +
        "\n" +
        "Potencia ja gerada: " +
        powerGenerated
    );
    powerGenerated -= generating;
    if (powerGenerated >= powerToGenerate) {
      //limpa interval
    }
    */
