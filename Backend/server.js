const express = require("express");
const cors = require("cors"); //acesso de outros domínios
const mongoose = require("mongoose"); //conexão com o mongoDB
const requireDir = require("require-dir");
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

const server = new mosca.Server(moscaSettings);
server.on("ready", setup);

// Dispara quando um cliente se conecta
server.on("clientConnected", function(client) {
  // console.log("Client Connected:", client.id);
});

// Dispara quando um cliente se desconecta
server.on("clientDisconnected", function(client) {
  // console.log("Client Disconnected:", client.id);
});

// Dispara quando uma mesnsagem eh publicada
server.on("published", function(packet, client) {
  // console.log("Published:\n", packet);
});

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

//Iniciando o DB
mongoose.connect("mongodb://localhost:27017/tcc", { useNewUrlParser: true });

//Chama os models
requireDir("./src/models");

//Rotas
app.use("/api", require("./src/routes"));

app.listen(3000);
