import api from './api';

const taskService = {
    // Listar todas as tarefas
    getAll: async (category = null) => {
        const url = category ? `/tasks?category=${category}` : '/tasks';
        const response = await api.get(url);
        return response.data;
    },

    // Criar nova tarefa
    create: async (taskData) => {
        const response = await api.post('/tasks', taskData);
        return response.data;
    },

    // Atualizar tarefa
    update: async (id, taskData) => {
        const response = await api.put(`/tasks/${id}`, taskData);
        return response.data;
    },

    // Deletar tarefa
    delete: async (id) => {
        const response = await api.delete(`/tasks/${id}`);
        return response.data;
    },

    // Marcar como completa/incompleta
    toggle: async (id) => {
        const response = await api.patch(`/tasks/${id}/toggle`);
        return response.data;
    }
};

export default taskService;