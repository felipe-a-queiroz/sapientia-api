import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import authService from '../services/authService.js';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('A variável de ambiente JWT_SECRET não está definida.');
}

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res
            .status(401)
            .json({ message: 'Acesso negado. Nenhum token fornecido.' });
    }

    const token = authHeader.split(' ')[1];

    // Verifica se o token está na blacklist (logout)
    if (authService.isTokenBlacklisted(token)) {
        return res
            .status(401)
            .json({ message: 'Token inválido (logout realizado).' });
    }

    try {
        // Verifica o token JWT
        const decoded = jwt.verify(token, JWT_SECRET);

        // Verifica se o usuário existe (opcional, mas seguro)
        const user = await userModel.findUserById(decoded.id);
        if (!user) {
            return res
                .status(401)
                .json({ message: 'Token inválido - usuário não encontrado.' });
        }

        // Anexa as informações do usuário na requisição
        req.user = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
        };

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido ou expirado.' });
    }
};

export default authenticateToken;
