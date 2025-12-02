import api from './api';

const authService = {
    // Cadastrar novo usuário
    register: async (name, email, password) => {
        const response = await api.post('/auth/register', {
            name,
            email,
            password
        });

        // Salvar token e usuário no localStorage
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }

        return response.data;
    },

    // Fazer login
    login: async (email, password) => {
        const response = await api.post('/auth/login', {
            email,
            password
        });

        // Salvar token e usuário no localStorage
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }

        return response.data;
    },

    // Fazer logout
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    // Pegar usuário atual
    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            return JSON.parse(userStr);
        }
        return null;
    },

    // Verificar se está logado
    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    }
};

export default authService;