const express = require('express');
const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Rota principal que utiliza o homeController
router.get('/', homeController.getHome);

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

module.exports = router;
