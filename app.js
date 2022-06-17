import Token from './services/token.js';

// Evento para Validar o Token
const token = new Token();

// Evento de Captura de Logout
document.querySelector(".logout").addEventListener("click", (e) => {
    token.logout();
});