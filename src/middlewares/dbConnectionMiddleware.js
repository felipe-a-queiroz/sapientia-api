import { connectDB } from '../config/database.js';

/**
 * Middleware para garantir que a conexão com o banco de dados
 * esteja estabelecida antes de processar a requisição.
 * Ideal para ambientes serverless, onde a conexão é reutilizada
 * em invocações "warm".
 */
const dbConnectionMiddleware = async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error(
            'Falha ao conectar ao banco de dados no middleware:',
            error
        );
        // Retorna um erro 503 Service Unavailable, pois a API não pode funcionar sem o DB.
        res.status(503).json({ message: 'Serviço indisponível no momento.' });
    }
};

export default dbConnectionMiddleware;
