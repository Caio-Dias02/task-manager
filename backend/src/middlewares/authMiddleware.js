const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        // 1. Pegar o token do header
        const authHeader = req.headers.authorization;

        // 2. Verificar se o token existe
        if (!authHeader) {
            return res.status(401).json({
                error: true,
                message: 'Token não fornecido'
            });
        }

        // 3. O token vem no formato: "Bearer token_aqui"
        // Precisamos separar e pegar só o token
        const parts = authHeader.split(' ')
        
        // 4. Verificar se está no formato correto
        if (parts.length !== 2) {
            return res.status(401).json({
                error: true,
                message: 'Token mal formatado'
            });
        }

        const [scheme, token] = parts;

        // 5. Verificar se começa com "Bearer"
        if (!/^Bearer$/i.test(scheme)) {
            return res.status(401).json({
                error: true,
                message: 'Token mal formatado'
            });
        }

        // 6. Verificar se o token é válido
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    error: true,
                    message: 'Token inválido ou expirado'
                });
            }

            // 7. Se o token for válido, adiciona os dados do usuário no req
            req.user = decoded;

            // 8. Passa para o próximo middleware/controller
            return next();
        });

    } catch (error) {
        return res.status(401).json({
            error: true,
            message: 'Erro na autenticação'
        });
    }
};

module.exports = authMiddleware;