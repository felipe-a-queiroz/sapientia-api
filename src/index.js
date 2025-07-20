// Ponto de entrada principal para Express e Lambda
import express from 'express';
import cors from 'cors';
import logger from './middlewares/logger.js';
import routes from './routes/index.js';

import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerDocument = YAML.load(path.join(__dirname, './open-api.yml'));


const app = express();

// Habilita o CORS para todas as origens. Para produção, é recomendado restringir para a origem do seu frontend.
app.use(cors());
app.use(express.json());
app.use(logger);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Monta as rotas da aplicação a partir do arquivo de rotas
app.use('/', routes);

export default app;
