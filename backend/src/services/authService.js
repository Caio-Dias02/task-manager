const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');

const authService = {
  // Registrar novo usuário
  register: async (name, email, password) => {
    // 1. Validar dados
    if (!name || !email || !password) {
      const error = new Error('Nome, email e senha são obrigatórios');
      error.status = 400;
      throw error;
    }

    if (password.length < 6) {
      const error = new Error('Senha deve ter no mínimo 6 caracteres');
      error.status = 400;
      throw error;
    }

    // 2. Verificar se o email já existe
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      const error = new Error('Email já cadastrado');
      error.status = 409; // Conflict
      
      throw error;
    }

    // 3. Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Criar o usuário no banco
    const user = await userRepository.create(name, email, hashedPassword);

    // 5. Gerar token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // 6. Retornar usuário e token
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      token
    };
  },

  // Fazer login
  login: async (email, password) => {
    // 1. Validar dados
    if (!email || !password) {
      const error = new Error('Email e senha são obrigatórios');
      error.status = 400;
      throw error;
    }

    // 2. Buscar usuário por email
    const user = await userRepository.findByEmail(email);
    if (!user) {
      const error = new Error('Email ou senha incorretos');
      error.status = 401;
      throw error;
    }

    // 3. Verificar se a senha está correta
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error('Email ou senha incorretos');
      error.status = 401;
      throw error;
    }

    // 4. Gerar token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // 5. Retornar usuário e token
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      token
    };
  }
};

module.exports = authService;