// Para requisicoes HTTP (API)
const axios = require("axios");

// Para requisicoes MQTT
const mqtt = require("mqtt");

/**
 * CONFIGURACOES GERAIS
 */

// Nome da microrrede simulada
const microgridId = "MicroGrid1";
const GUs = ["GU1MG1", "GU2MG1", "GU3MG1"];

// Configuracao do cliente MQTT - ADD EXPLICACAO DE CADA LINHA
client_options = {
  clientId: microgridId,
  //username: "test",
  //password: "password",
  clean: true,
  qos: 0 //0, 1, 2
};

//-----------------------------------

// Inicia o cliente MQTT
const clientMQTT = mqtt.connect("mqtt://localhost", client_options);

// Geradora de valores aleatorios de sensor
function randomSensorValues(guName) {
  clientMQTT.publish(
    `microgrid/${microgridId}/gunit/${guName}/meter `,
    String(Math.floor(Math.random() * 100)) //gera de 0 a 99
  );
}

// Funcao que adiciona as unidades geradoras definidas no generationUnits.json
function addGUs() {
  const generationUnits = require("./generationUnits.json");

  generationUnits.map(gu => {
    axios
      .request({
        method: "post",
        url: "http://localhost:3000/api/generationunit",
        data: gu
      })
      .catch(err => console.log(err));
  });
}

function activateGUs() {}
GUs.map(guName => {
  clientMQTT.subscribe(`microgrid/${microgridId}/gunit/+/generate`, function(
    err
  ) {
    if (!err) {
      clientMQTT.publish(
        `microgrid/${microgridId}/gunit/${guName}/available`,
        "true"
      );
      setInterval(function() {
        randomSensorValues(guName);
      }, 5000);
    }
  });
});

// Funcao disparada pelo evento de connect
// clientMQTT.on("connect", function() {

// });

// Funcao disparada pelo evento de recebimento de mensagem
clientMQTT.on("message", function(topic, payload) {
  console.log([topic, payload].join("=> "));
});

//------------------------------------------------

/**
 * Ordem de teste
 *
 * Add as unidades geradoras
 * Ativa as GU por connect e subscribe
 */
addGUs();
activateGUs();
