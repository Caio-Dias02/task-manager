const taskRepository = require('../repositories/taskRepository');

const taskService = {
  // Listar tarefas do usuário
  list: async (userId, category) => {
    const tasks = await taskRepository.findByUserId(userId, category);
    return tasks;
  },

  // Criar nova tarefa
  create: async (userId, title, description, category) => {
    // 1. Validar dados obrigatórios
    if (!title || title.trim() === '') {
      const error = new Error('Título é obrigatório');
      error.status = 400;
      throw error;
    }

    // 2. Validar tamanho do título
    if (title.length > 200) {
      const error = new Error('Título não pode ter mais de 200 caracteres');
      error.status = 400;
      throw error;
    }

    // 3. Validar categoria (se fornecida)
    const validCategories = ['trabalho', 'pessoal', 'estudos', 'saude', 'outros'];
    
    if (category && !validCategories.includes(category.toLowerCase())) {
      const error = new Error(`Categoria inválida. Use: ${validCategories.join(', ')}`);
      error.status = 400;
      throw error;
    }

    // 4. Criar tarefa no banco
    const task = await taskRepository.create(
      userId,
      title.trim(),
      description ? description.trim() : null,
      category ? category.toLowerCase() : null
    );

    return task;
  },

  // Atualizar tarefa
  update: async (userId, taskId, data) => {
    // 1. Verificar se a tarefa existe e pertence ao usuário
    const existingTask = await taskRepository.findById(taskId, userId);
    if (!existingTask) {
      const error = new Error('Tarefa não encontrada');
      error.status = 404;
      throw error;
    }

    // 2. Validar título se foi fornecido
    if (data.title !== undefined) {
      if (!data.title || data.title.trim() === '') {
        const error = new Error('Título não pode ser vazio');
        error.status = 400;
        throw error;
      }

      if (data.title.length > 200) {
        const error = new Error('Título não pode ter mais de 200 caracteres');
        error.status = 400;
        throw error;
      }
    }

    // 3. Validar categoria se foi fornecida
    const validCategories = ['trabalho', 'pessoal', 'estudos', 'saude', 'outros'];
    if (data.category && !validCategories.includes(data.category.toLowerCase())) {
      const error = new Error(`Categoria inválida. Use: ${validCategories.join(', ')}`);
      error.status = 400;
      throw error;
    }

    // 4. Preparar dados para atualização (manter valores antigos se não foram fornecidos)
    const updateData = {
      title: data.title !== undefined ? data.title.trim() : existingTask.title,
      description: data.description !== undefined ? (data.description ? data.description.trim() : null) : existingTask.description,
      category: data.category !== undefined ? (data.category ? data.category.toLowerCase() : null) : existingTask.category,
      completed: data.completed !== undefined ? data.completed : existingTask.completed
    };

    // 5. Atualizar no banco
    const updatedTask = await taskRepository.update(taskId, userId, updateData);

    return updatedTask;
  },

  // Deletar tarefa
  delete: async (userId, taskId) => {
    // 1. Verificar se a tarefa existe e pertence ao usuário
    const existingTask = await taskRepository.findById(taskId, userId);
    if (!existingTask) {
      const error = new Error('Tarefa não encontrada');
      error.status = 404;
      throw error;
    }

    // 2. Deletar do banco
    await taskRepository.delete(taskId, userId);

    return { message: 'Tarefa deletada com sucesso' };
  },

  // Alternar status de completado
  toggle: async (userId, taskId) => {
    // 1. Verificar se a tarefa existe e pertence ao usuário
    const existingTask = await taskRepository.findById(taskId, userId);
    if (!existingTask) {
      const error = new Error('Tarefa não encontrada');
      error.status = 404;
      throw error;
    }

    // 2. Alternar status no banco
    const updatedTask = await taskRepository.toggleComplete(taskId, userId);

    return updatedTask;
  }
};

module.exports = taskService;