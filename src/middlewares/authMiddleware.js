const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Acesso negado. Nenhum token fornecido.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await userModel.findUserById(decoded.id);
    if (!user) {
        return res.status(401).json({ message: 'Token inválido - usuário não encontrado.' });
    }

    req.user = decoded; // Adiciona o payload do token ao objeto de requisição
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido.' });
  }
};
