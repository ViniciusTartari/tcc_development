const express = require("express");
const cors = require("cors"); //acesso de outros domínios
const mongoose = require("mongoose"); //conexão com o mongoDB
const requireDir = require("require-dir");
const axios = require("axios");
const morgan = require("morgan");
const mosca = require("mosca");

//Iniciando o app
const app = express();

//configuracoes do mosca - broker mqtt
const ascoltatore = {
  type: "mongo",
  url: "mongodb://localhost:27017/moscaTCC",
  pubsubCollection: "ascoltatori",
  mongo: {}
};

const moscaSettings = {
  port: 1883,
  id: "mosca",
  backend: ascoltatore,
  persistence: {
    factory: mosca.persistence.Mongo,
    url: "mongodb://localhost:27017/moscaTCC"
  }
};

const moscaServer = new mosca.Server(moscaSettings);
moscaServer.on("ready", setup);

function setup() {
  console.log("Mosca server is up and running!");
}

//end mosca

//Permite a aplicação recebimento de json
app.use(express.json());

/*
Permite acesso de outros domínios a api
Pode receber parâmetros como domínios que podem acessar, entre outros;
*/
app.use(cors());

// Mostra as requisicoes http que o servidor receber no console;
app.use(morgan("dev"));

//Iniciando o DB
mongoose.connect("mongodb://localhost:27017/tcc", { useNewUrlParser: true });

//Chama os models
requireDir("./src/models");

//Rotas
app.use("/api", require("./src/routes"));

app.listen(3000);

// -----------------------------------------------------------------------
/**
 * MOSCA REQUESTS
 */

chamaApi = log => {
  axios
    .request({
      method: "post",
      url: "http://localhost:3000/api/log",
      data: log
    })
    .catch(err => console.log(err));
};

// Dispara quando um cliente se conecta
moscaServer.on("clientConnected", function(packet) {
  const log = {
    log_type: "connect",
    log_client: packet.id
  };
  chamaApi(log);

  console.log("Cliente " + log.log_client + " conectado!");
});

// Dispara quando um cliente se desconecta
moscaServer.on("clientDisconnected", function(packet) {
  const log = {
    log_type: "disconnect",
    log_client: packet.id
  };
  chamaApi(log);

  console.log("Cliente " + log.log_client + " desconectado!");
});

// Dispara quando uma mensagem eh publicada
moscaServer.on("published", function(packet) {
  if (packet.topic.includes("$SYS")) {
    if (packet.topic == "$SYS/mosca/new/subscribes") {
      const payload = JSON.parse(packet.payload);
      const log = {
        log_type: "subscribe",
        log_client: payload.clientId,
        log_topic: payload.topic,
        log_messageId: packet.messageId
      };
      chamaApi(log);

      console.log(
        "Cliente " +
          log.log_client +
          " se inscreveu no topico " +
          log.log_topic +
          "!"
      );
    } else if (packet.topic == "$SYS/mosca/new/unsubscribes") {
      const payload = JSON.parse(packet.payload);
      const log = {
        log_type: "unsubscribe",
        log_client: payload.clientId,
        log_topic: packet.topic,
        log_messageId: packet.messageId
      };
      chamaApi(log);

      console.log(
        "Cliente " +
          log.log_client +
          " se desinscreveu do topico " +
          log.log_topic +
          "!"
      );
    }
  } else {
    const log = {
      log_type: "publish",
      log_topic: packet.topic,
      log_messageId: packet.messageId,
      // Converte o payload de Buffer para String
      log_payload: packet.payload.toString("utf8")
    };
    chamaApi(log);
    console.log(
      "Publicado no topico " +
        log.log_topic +
        " o valor " +
        log.log_payload +
        "!"
    );
  }

  // enviar para tratamento
});
