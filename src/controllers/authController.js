const authService = require('../services/authService');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res
            .status(400)
            .json({
                message: 'Nome de usuário, email e senha são obrigatórios.',
            });
    }

    try {
        const user = await authService.registerUser(username, email, password);
        const userResponse = {
            id: user.id,
            username: user.username,
            email: user.email,
        };
        return res
            .status(201)
            .json({
                message: 'Usuário registrado com sucesso!',
                user: userResponse,
            });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res
            .status(400)
            .json({ message: 'Nome de usuário e senha são obrigatórios.' });
    }

    try {
        const { token } = await authService.loginUser(username, password);
        return res.json({ message: 'Login bem-sucedido!', token });
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
};

exports.getProfile = (req, res) => {
    res.json({
        message: `Bem-vindo ao seu perfil, ${req.user.username} (ID: ${req.user.id})`,
    });
};

exports.logout = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(400).json({ message: 'Token não fornecido.' });
    }
    const token = authHeader.split(' ')[1];
    try {
        await authService.logoutUser(token);
        return res.json({ message: 'Logout realizado com sucesso!' });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
