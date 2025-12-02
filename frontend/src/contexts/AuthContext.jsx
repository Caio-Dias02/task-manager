import { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';

// Criar o contexto
export const AuthContext = createContext({});

// Provider do contexto
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Ao carregar a aplicação, verifica se tem usuário logado
    useEffect(() => {
        const loadUser = () => {
            const storedUser = authService.getCurrentUser();
            if (storedUser) {
                setUser(storedUser);
            }
            setLoading(false);
        };

        loadUser();
    }, []);

    // Função de login
    const login = async (email, password) => {
        const data = await authService.login(email, password);
        setUser(data.user);
        return data;
    };

    // Função de registro
    const register = async (name, email, password) => {
        const data = await authService.register(name, email, password);
        setUser(data.user);
        return data;
    };

    // Função de logout
    const logout = () => {
        authService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout,
                isAuthenticated: !!user
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}