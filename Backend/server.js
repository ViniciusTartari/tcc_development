const express = require("express");
const cors = require("cors"); //acesso de outros domínios
const mongoose = require("mongoose"); //conexão com o mongoDB
const requireDir = require("require-dir");

//Iniciando o app
const app = express();

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
