const taskValidator = {
    // Validar dados de criação
    validateCreate: (data) => {
      const errors = [];
  
      if (!data.title || data.title.trim() === '') {
        errors.push('Título é obrigatório');
      }
  
      if (data.title && data.title.length > 200) {
        errors.push('Título não pode ter mais de 200 caracteres');
      }
  
      const validCategories = ['trabalho', 'pessoal', 'estudos', 'saude', 'outros'];
      if (data.category && !validCategories.includes(data.category.toLowerCase())) {
        errors.push(`Categoria inválida. Use: ${validCategories.join(', ')}`);
      }
  
      return {
        isValid: errors.length === 0,
        errors
      };
    }
  };
  
  module.exports = taskValidator;