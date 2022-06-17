import buscaUF from "./buscaUF.js";
import buscaCidade from "./buscaCidade.js";
import Token from './token.js';
import Form from './form.js';

export default class Cadastro{
    
};

// Evento para Validar o Token
const token = new Token();

// Evento de Captura de Logout
document.querySelector(".logout").addEventListener("click", (e) => {
    token.logout();
});

// Evento para Buscar Lista de UFs
document.addEventListener('DOMContentLoaded', buscaUF());
document.addEventListener('DOMContentLoaded', buscaCidade("SC"));

// Evento para Buscar Cidades ao Mudar UF
document.addEventListener('input', function(event) {
    if(event.target.id === 'uf') return buscaCidade(event.target.value);
}, false);

// Evento para Adicionar um Suspeito ao Submeter o Formulário
document.querySelector('#form-suspeito').addEventListener('submit', (e) => {
    e.preventDefault();
    Form.grava();
});

// Máscara para CPF
document.getElementById('cpf').addEventListener('input', function(e) {
    var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/);
    e.target.value = x[1] + '.' + x[2] + '.' + x[3] + '-' + x[4];
});