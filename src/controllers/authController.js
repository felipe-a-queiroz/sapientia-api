import authService from '../services/authService.js';

/**
 * Registro de novo usuário
 */
export const register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            message: 'Nome de usuário, e-mail e senha são obrigatórios.',
        });
    }

    try {
        const user = await authService.registerUser(username, email, password);
        const userResponse = {
            id: user.id,
            username: user.username,
            email: user.email,
        };
        return res.status(201).json({
            message: 'Usuário registrado com sucesso!',
            user: userResponse,
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

/**
 * Login de usuário e retorno do token JWT
 */
export const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res
            .status(400)
            .json({ message: 'Nome de usuário e senha são obrigatórios.' });
    }

    try {
        const { token, userPayload } = await authService.loginUser(
            username,
            password
        );
        const userResponse = res.json({
            message: 'Login bem-sucedido!',
            token,
            user: userPayload,
        });

        return userResponse;
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
};

/**
 * Rota protegida de perfil
 */
export const getProfile = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Não autenticado.' });
    }

    res.json({
        message: `Bem-vindo ao seu perfil, ${req.user.username} (ID: ${req.user.id})`,
        user: req.user,
    });
};

export const updateProfile = async (req, res) => {
    const { username, email } = req.body;

    if (!username || !email) {
        return res.status(400).json({
            message: 'Nome de usuário e e-mail são obrigatórios.',
        });
    }

    try {
        const updatedUser = await authService.updateUserProfile(
            req.user.id,
            username,
            email
        );
        return res.json({
            message: 'Perfil atualizado com sucesso!',
            user: updatedUser,
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

/**
 * Logout com invalidação do token atual
 */
export const logout = async (req, res) => {
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
