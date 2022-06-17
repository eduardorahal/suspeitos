import Form from './form.js';
import Storage from './storage.js';


// Evento para Adicionar um Suspeito ao Submeter o Formulário
document.querySelector('#principal').addEventListener('submit', (e) => {
    e.preventDefault();
    Login.validaSenha();
});

export default class Login {  

    static validaSenha() {
        
        //Extrai dados do Login Form
        const username = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;
        
        //Valida Campos do Login Form
        if(username === '' || password === '') {
            Form.showAlert('Preencha todos os campos', 'danger');
        } else {
            // Verifica Dados de Login
            if (username === 'admin' && password === 'admin'){
                Storage.addToken();
                Form.showAlert('Acesso Autorizado', 'success');
                window.location.replace("../index.html");
            }
            else {
                Form.showAlert('Usuário/Senha Incorretos', 'danger');
            }
        }
    }

}