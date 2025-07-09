const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('A variável de ambiente JWT_SECRET não está definida.');
}

const tokenBlacklist = [];

exports.registerUser = async (username, email, password) => {
  const existingUserByEmail = await userModel.findUserByEmail(email);
  if (existingUserByEmail) {
    throw new Error('Este email já está em uso.');
  }

  const existingUserByUsername = await userModel.findUserByUsername(username);
  if (existingUserByUsername) {
    throw new Error('Este nome de usuário já está em uso.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = userModel.createUser({ username, email, password: hashedPassword });
  return newUser;
};

exports.loginUser = async (username, password) => {
  const user = await userModel.findUserByUsername(username);
  if (!user) {
    throw new Error('Credenciais inválidas.');
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new Error('Credenciais inválidas.');
  }

  const token = jwt.sign({
    id: user.id,
    username: user.username,
    email: user.email
  }, JWT_SECRET, {
    expiresIn: '12h', // Token expira em 12 horas
  });

  return { token };
};

exports.logoutUser = async (token) => {
  tokenBlacklist.push(token);
};

// Função utilitária para verificar se o token está na blacklist
exports.isTokenBlacklisted = (token) => {
  return tokenBlacklist.includes(token);
};
