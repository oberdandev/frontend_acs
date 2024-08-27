export const validateEmail = { 
  required: 'Campo obrigatório', 
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'Email inválido'
  }
};

export const validateCNS = {
  required: 'Campo obrigatório',
  minLength: { value: 15, message: 'O Cartão SUS deve ter 15 caracteres.' },
  maxLength: { value: 15, message: 'O Cartão SUS deve ter 15 caracteres.' }
};

export const validateCNES = {
  required: 'Campo obrigatório',
  minLength: { value: 7, message: 'O CNES deve ter 15 caracteres.' },
  maxLength: { value: 7, message: 'O CNES ter 15 caracteres.' }
}