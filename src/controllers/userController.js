import userService from '../services/userService.js';

export const getUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar usuários.' });
    }
};

export const addUser = async (req, res) => {
    const { username, email, password, role } = req.body;
    const roleToUse = role ? role : 'user';

    if (!username || !email || !password) {
        return res.status(400).json({
            message: 'Nome de usuário, e-mail e senha são obrigatórios.',
        });
    }

    try {
        const user = await userService.createUser(
            username,
            email,
            password,
            roleToUse
        );
        res.status(201).json({
            message: 'Usuário adicionado com sucesso!',
            user,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, role } = req.body;

    if (!username || !email) {
        return res.status(400).json({
            message: 'Nome de usuário e e-mail são obrigatórios.',
        });
    }

    try {
        const updatedUser = await userService.updateUser(id, {
            username,
            email,
            role,
        });
        res.json({
            message: 'Usuário atualizado com sucesso!',
            user: updatedUser,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        await userService.deleteUser(id);
        res.json({ message: 'Usuário excluído com sucesso!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
