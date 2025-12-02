const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /api/auth/register - Cadastrar novo usuário
router.post('/register', authController.register);

// POST /api/auth/login - Fazer login
router.post('/login', authController.login);

module.exports = router;