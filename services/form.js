import Suspeito from "../models/suspeito.js";
import Storage from "./storage.js";

export default class Form {

    // Função Limpa Campos
    static limpaCampos() {
        document.querySelector('#nome').value = '';
        document.querySelector('#cpf').value = '';
        document.querySelector('#endereco').value = '';
        document.querySelector('#cidade').value = '';
        document.querySelector('#uf').value = '';
    }

    // Função Mostra Alertas
    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#alert');
        container.insertBefore(div, form);
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    // Extração de dados do Formulário
    static grava(){
        const nome = document.querySelector('#nome').value;
        const cpf = document.querySelector('#cpf').value;
        const endereco = document.querySelector('#endereco').value;
        const cidade = document.querySelector('#cidade').value;
        const uf = document.querySelector('#uf').value;

    // Validação de Preenchimento
        if(nome === '' || cpf === '' || endereco === '' || cidade === '' || uf === '') {
            Form.showAlert('Preencha todos os campos', 'danger');
        } else {
            // Grava Suspeito na Base
            const suspeito = new Suspeito(nome, cpf, endereco, cidade, uf);
            Storage.addSuspeito(suspeito);
            Form.showAlert('Suspeito Cadastrado', 'success');
            Form.limpaCampos();
        }
    }
    
    

}