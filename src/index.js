// Ponto de entrada principal para Express e Lambda
import express from 'express';
import cors from 'cors';
import logger from './middlewares/logger.js';
import routes from './routes/index.js';

const app = express();

// Habilita o CORS para todas as origens. Para produção, é recomendado restringir para a origem do seu frontend.
app.use(cors());
app.use(express.json());
app.use(logger);

// Monta as rotas da aplicação a partir do arquivo de rotas
app.use('/', routes);

export default app;
