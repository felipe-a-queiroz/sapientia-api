// Conecta-se ao banco de dados e executa as queries relacionadas a usuários.
const db = require('../config/database');

exports.findUserByEmail = async (email) => {
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

exports.findUserByUsername = async (username) => {
  const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
  return rows[0];
};

exports.findUserById = async (id) => {
  const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
};

exports.createUser = async (userData) => {
  const { username, email, password } = userData;
  
  // Executa a query de inserção
  const [result] = await db.query(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, password]
  );

  // Retorna o usuário recém-criado para consistência com o código anterior.
  // O `insertId` nos dá o ID do novo registro.
  const newUser = {
    id: result.insertId,
    username,
    email,
  };

  return newUser;
};
