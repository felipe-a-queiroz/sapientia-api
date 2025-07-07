// Ponto de entrada principal para Express e Lambda
const express = require('express');
const cors = require('cors');
const logger = require('./middlewares/logger');
const routes = require('./routes');

const app = express();

// Habilita o CORS para todas as origens. Para produção, é recomendado restringir para a origem do seu frontend.
app.use(cors());
app.use(express.json());
app.use(logger);

// Monta as rotas da aplicação a partir do arquivo de rotas
app.use('/', routes);

module.exports = app;
