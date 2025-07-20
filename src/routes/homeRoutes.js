import { Router } from 'express';
import { getHome } from '../controllers/homeController.js';

const router = Router();

// Rota principal
router.get('/', getHome);

// Rota de Health Check para verificar se a API está no ar
router.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

export default router;
