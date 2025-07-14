import db from '../config/database.js';

const findUserByEmail = async (email) => {
    if (!email) return null;
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [
        email,
    ]);
    return rows[0] || null;
};

const findUserByUsername = async (username) => {
    if (!username) return null;
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [
        username,
    ]);
    return rows[0] || null;
};

const findUserById = async (id) => {
    if (!id) return null;
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0] || null;
};

const createUser = async ({ username, email, password, role = 'user' }) => {
    const [result] = await db.query(
        'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
        [username, email, password, role]
    );

    return {
        id: result.insertId,
        username,
        email,
        role,
    };
};

const updateUser = async (id, { username, email }) => {
    const [result] = await db.query(
        'UPDATE users SET username = ?, email = ? WHERE id = ?',
        [username, email, id]
    );

    if (result.affectedRows === 0) {
        throw new Error('Usuário não encontrado ou não atualizado.');
    }

    return findUserById(id);
};  

export default {
    findUserByEmail,
    findUserByUsername,
    findUserById,
    createUser,
    updateUser,
};
