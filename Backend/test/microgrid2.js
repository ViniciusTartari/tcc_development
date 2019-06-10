// Para requisicoes HTTP (API)
const axios = require("axios");

// Para requisicoes MQTT
const mqtt = require("mqtt");

/**
 * CONFIGURACOES GERAIS
 */

// Nome da microrrede simulada
const microgridId = "MicroGrid2";
const GUs = [
  "GU1MG2",
  "GU2MG2",
  "GU3MG2",
  "GU4MG2",
  "GU5MG2",
  "GU6MG2",
  "GU7MG2",
  "GU8MG2",
  "GU9MG2",
  "GU10MG2"
];

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
  clientMQTT.publish(
    `microgrid/${microgridId}/gunit/${guName}/meter`,
    String(Math.floor(Math.random() * 10)) //gera de 0 a 9
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

//------------------------------------------------

activateGUs();
