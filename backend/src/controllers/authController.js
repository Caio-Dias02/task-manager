const authService = require('../services/authService');

const authController = {
    // POST /api/auth/register
    register: async (req, res, next) => {
        try {
            const { name, email, password } = req.body;

            const result = await authService.register(name, email, password);

            res.status(201).json(result);
        } catch (error) {
            next(error); // Passa o erro para o errorHandler
        }
    },

    // POST /api/auth/login
    login: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const result = await authService.login(email, password);

            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
};

module.exports = authController;