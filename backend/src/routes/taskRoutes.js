const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');

// Todas as rotas abaixo precisam de autenticação
router.use(authMiddleware);

// GET /api/tasks - Listar todas as tarefas do usuário logado
router.get('/', taskController.list);

// POST /api/tasks - Criar nova tarefa
router.post('/', taskController.create);

// PUT /api/tasks/:id - Atualizar uma tarefa
router.put('/:id', taskController.update);

// DELETE /api/tasks/:id - Deletar uma tarefa
router.delete('/:id', taskController.delete);

// PATCH /api/tasks/:id/toggle - Marcar como completa/incompleta
router.patch('/:id/toggle', taskController.toggle);

module.exports = router;