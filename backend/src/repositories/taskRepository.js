const db = require('../config/database');

const taskRepository = {
    // Listar todas as tarefas do usuário
    findByUserId: async (userId, category = null) => {
        let query = 'SELECT * FROM tasks WHERE user_id = $1';
        const params = [userId];

        // Se tiver filtro de categoria, adiciona na query
        if (category) {
            query += ' AND category = $2';
            params.push(category);
        }

        query += ' ORDER BY created_at DESC';

        const result = await db.query(query, params);
        return result.rows;
    },

    // Buscar uma tarefa específica
    findById: async (id, userId) => {
        const query = 'SELECT * FROM tasks WHERE id = $1 AND user_id = $2';
        const result = await db.query(query, [id, userId]);
        return result.rows[0];
    },

    // Criar nova tarefa
    create: async (userId, title, description, category) => {
        const query = `
      INSERT INTO tasks (user_id, title, description, category)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
        const result = await db.query(query, [userId, title, description, category]);
        return result.rows[0];
    },

    // Atualizar tarefa
    update: async (id, userId, data) => {
        const query = `
      UPDATE tasks
      SET title = $1, description = $2, category = $3, completed = $4, updated_at = CURRENT_TIMESTAMP
      WHERE id = $5 AND user_id = $6
      RETURNING *
    `;
        const result = await db.query(query, [
            data.title,
            data.description,
            data.category,
            data.completed,
            id,
            userId
        ]);
        return result.rows[0];
    },

    // Deletar tarefa
    delete: async (id, userId) => {
        const query = 'DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *';
        const result = await db.query(query, [id, userId]);
        return result.rows[0];
    },

    // Alternar status de completado
    toggleComplete: async (id, userId) => {
        const query = `
      UPDATE tasks
      SET completed = NOT completed, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1 AND user_id = $2
      RETURNING *
    `;
        const result = await db.query(query, [id, userId]);
        return result.rows[0];
    }
};

module.exports = taskRepository;