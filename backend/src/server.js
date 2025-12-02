const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globais
app.use(cors()); // Permite frontend acessar
app.use(express.json()); // Permite receber JSON no body

// Rota de teste
app.get('/', (req, res) => {
    res.json({ message: '🚀 API está funcionando!' });
});

// Rotas da aplicação
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Middleware de erro (SEMPRE POR ÚLTIMO!)
app.use(errorHandler);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📍 Acesse: http://localhost:${PORT}`);
});