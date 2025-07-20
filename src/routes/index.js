import { Router } from 'express';
import dbConnectionMiddleware from '../middlewares/dbConnectionMiddleware.js';
import homeRoutes from './homeRoutes.js';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import profileRoutes from './profileRoutes.js';

const router = Router();

// Rotas públicas que não precisam de conexão com o banco.
// Inclui a rota principal '/' e a de health check '/health'.
router.use('/', homeRoutes);

// Rotas que precisam de conexão com o banco.
// O middleware de conexão será aplicado a todas as rotas de auth e users.
router.use('/auth', dbConnectionMiddleware, authRoutes);
router.use('/users', dbConnectionMiddleware, userRoutes);
router.use('/profile', dbConnectionMiddleware, profileRoutes);

export default router;
