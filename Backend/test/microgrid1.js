// Para requisicoes HTTP (API)
const axios = require("axios");

// Para requisicoes MQTT
const mqtt = require("mqtt");

/**
 * CONFIGURACOES GERAIS
 */

// Nome da microrrede simulada
const microgridId = "MicroGrid1";
const GUs = ["GU1MG1", "GU2MG1", "GU3MG1", "GU4MG1"];

// Configuracao do cliente MQTT
client_options = {
  clientId: microgridId,
  clean: true,
  qos: 0 //0, 1, 2
};

//-----------------------------------

// Inicia o cliente MQTT
const clientMQTT = mqtt.connect("mqtt://localhost", client_options);

// Geradora de valores aleatorios de sensor
function randomSensorValues(guName) {
  let sensor = String(Math.floor(Math.random() * 15));
  clientMQTT.publish(
    `microgrid/${microgridId}/gunit/${guName}/meter`,
    sensor //gera de 0 a 15
  );
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

// Funcao disparada pelo evento de recebimento de mensagem
clientMQTT.on("message", function(topic, payload) {
  console.log([topic, payload].join(" => "));
});

// Funcao que add as GUs a plataforma
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

//------------------------------------------------

addGUs();
activateGUs();
