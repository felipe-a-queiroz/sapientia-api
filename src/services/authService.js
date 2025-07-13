import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import userModel from '../models/userModel.js';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('A variável de ambiente JWT_SECRET não está definida.');
}

// Atenção: isso é volátil. Use Redis ou banco para produção.
const tokenBlacklist = [];

/**
 * Registra um novo usuário após validações básicas.
 */
const registerUser = async (username, email, password) => {
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
    });

    return newUser;
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
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
    };

    // Geração do token JWT
    const token = jwt.sign(userPayload, JWT_SECRET, { expiresIn: '1h' });

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

export default {
    registerUser,
    loginUser,
    logoutUser,
    isTokenBlacklisted,
};
