const db = require('../config/database');

const userRepository = {
  // Buscar usuário por email
  findByEmail: async (email) => {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await db.query(query, [email]);
    return result.rows[0]; // Retorna o primeiro usuário ou undefined
  },

  // Buscar usuário por ID
  findById: async (id) => {
    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rows[0];
  },

  // Criar novo usuário
  create: async (name, email, hashedPassword) => {
    const query = `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, name, email, created_at
    `;
    const result = await db.query(query, [name, email, hashedPassword]);
    return result.rows[0];
  }
};

module.exports = userRepository;