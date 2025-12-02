// Middleware que captura TODOS os erros da aplicação
const errorHandler = (err, req, res, next) => {
    console.error('❌ Erro capturado:', err);

    // Se o erro já tem um status HTTP, usa ele
    const status = err.status || err.statusCode || 500;

    // Se o erro já tem uma mensagem, usa ela
    const message = err.message || 'Erro interno do servidor';

    // Retorna a resposta de erro
    res.status(status).json({
        error: true,
        message: message,
        // Em desenvolvimento, mostra o stack trace (ajuda no debug)
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

module.exports = errorHandler;