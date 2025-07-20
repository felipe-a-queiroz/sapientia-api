import authService from '../services/authService.js';

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
