// Ponto de entrada principal para Express e Lambda
const express = require('express');
const logger = require('./middlewares/logger');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(logger);

// Monta as rotas da aplicação a partir do arquivo de rotas
app.use('/', routes);

module.exports = app;
