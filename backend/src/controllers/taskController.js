const taskService = require('../services/taskService');

const taskController = {
  // GET /api/tasks
  list: async (req, res, next) => {
    try {
      const userId = req.user.id; // Vem do authMiddleware
      const { category } = req.query; // Filtro opcional
      
      const tasks = await taskService.list(userId, category);
      
      res.status(200).json(tasks);
    } catch (error) {
      next(error);
    }
  },

  // POST /api/tasks
  create: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { title, description, category } = req.body;
      
      const task = await taskService.create(userId, title, description, category);
      
      res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  },

  // PUT /api/tasks/:id
  update: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const taskId = req.params.id;
      const { title, description, category, completed } = req.body;
      
      const task = await taskService.update(userId, taskId, { title, description, category, completed });
      
      res.status(200).json(task);
    } catch (error) {
      next(error);
    }
  },

  // DELETE /api/tasks/:id
  delete: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const taskId = req.params.id;
      
      await taskService.delete(userId, taskId);
      
      res.status(200).json({ message: 'Tarefa deletada com sucesso' });
    } catch (error) {
      next(error);
    }
  },

  // PATCH /api/tasks/:id/toggle
  toggle: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const taskId = req.params.id;
      
      const task = await taskService.toggle(userId, taskId);
      
      res.status(200).json(task);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = taskController;