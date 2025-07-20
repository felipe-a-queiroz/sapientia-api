import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import userModel from '../models/userModel.js';
import userService from './userService.js';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('A variável de ambiente JWT_SECRET não está definida.');
}

// Atenção: isso é volátil. Use Redis ou banco para produção.
const tokenBlacklist = [];

/**
 * Registra um novo usuário após validações básicas.
 */
const registerUser = async (username, email, password, role = 'user') => {
    return userService.createUser(username, email, password, role);
};

/**
 * Autentica o usuário e retorna um JWT assinado.
 */
const loginUser = async (username, password) => {
    const user = await userModel.findUserByUsername(username);
    if (!user) {
        throw new Error('Credenciais inválidas.');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        throw new Error('Credenciais inválidas.');
    }

    const userPayload = {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
    };

    // Geração do token JWT
    const token = jwt.sign(userPayload, JWT_SECRET, { expiresIn: '1h' });
    console.log('Generated JWT token for user:', userPayload.username);
    console.log('Token:', token);

    return { token, userPayload };
};

/**
 * Adiciona o token à blacklist (válido apenas enquanto a aplicação estiver ativa).
 */
const logoutUser = async (token) => {
    tokenBlacklist.push(token);
};

/**
 * Verifica se o token foi invalidado (logout).
 */
const isTokenBlacklisted = (token) => {
    return tokenBlacklist.includes(token);
};

const updateUserProfile = async (userId, username, email) => {
    // Validações simples
    if (!validator.isEmail(email)) {
        throw new Error('E-mail inválido.');
    }
    if (!validator.isAlphanumeric(username)) {
        throw new Error('Nome de usuário deve conter apenas letras e números.');
    }
    const existingUser = await userModel.findUserById(userId);
    if (!existingUser) {
        throw new Error('Usuário não encontrado.');
    }
    if (existingUser.email !== email) {
        const existingEmailUser = await userModel.findUserByEmail(email);
        if (existingEmailUser) {
            throw new Error('Este e-mail já está em uso.');
        }
    }
    if (existingUser.username !== username) {
        const existingUsernameUser =
            await userModel.findUserByUsername(username);
        if (existingUsernameUser) {
            throw new Error('Este nome de usuário já está em uso.');
        }
    }
    const updatedUser = await userModel.updateUser(userId, { username, email });
    return updatedUser;
};

export default {
    registerUser,
    loginUser,
    logoutUser,
    isTokenBlacklisted,
    updateUserProfile,
};
