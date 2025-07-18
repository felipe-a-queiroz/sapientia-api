import express from 'express';
import { getHome } from '../controllers/homeController.js';
import * as authController from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Rota principal que utiliza o homeController
router.get('/', getHome);

// Rota de Health Check
router.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Rotas de Autenticação
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authMiddleware, authController.logout);

// Rota protegida de exemplo
router.get('/profile', authMiddleware, authController.getProfile);
router.put('/profile', authMiddleware, authController.updateProfile);

export default router;
