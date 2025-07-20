import userModel from '../models/userModel.js';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const getAllUsers = async () => {
    const users = await userModel.findAllUsers();
    return users.map((user) => ({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
    }));
};

const createUser = async (username, email, password, role = 'user') => {
    // Validações simples
    if (!validator.isEmail(email)) {
        throw new Error('E-mail inválido.');
    }

    if (!validator.isStrongPassword(password, { minLength: 8 })) {
        throw new Error(
            'A senha deve conter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e símbolos.'
        );
    }

    const existingUserByEmail = await userModel.findUserByEmail(email);
    if (existingUserByEmail) {
        throw new Error('Este e-mail já está em uso.');
    }

    const existingUserByUsername = await userModel.findUserByUsername(username);
    if (existingUserByUsername) {
        throw new Error('Este nome de usuário já está em uso.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.createUser({
        username,
        email,
        password: hashedPassword,
        role,
    });

    return newUser;
};

const updateUser = async (id, { username, email, role }) => {
    if (!username || !email) {
        throw new Error('Nome de usuário e e-mail são obrigatórios.');
    }
    const updatedUser = await userModel.updateUser(id, {
        username,
        email,
        role,
    });
    return updatedUser;
};

const deleteUser = async (id) => {
    const user = await userModel.findUserById(id);
    if (!user) {
        throw new Error('Usuário não encontrado.');
    }
    await userModel.deleteUser(id);
    return { message: 'Usuário excluído com sucesso.' };
};

export default {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
};
