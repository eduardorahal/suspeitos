import Storage from "./storage.js";
import Form from "./form.js";
import Token from "./token.js";

// Evento para Validar o Token
const token = new Token();

// Evento de Captura de Logout
document.querySelector(".logout").addEventListener("click", (e) => {
    token.logout();
});

// Classe Consulta - Tabela de Exibição de Suspeitos - UI
export default class Consulta {

    //Função Mostra Suspeitos
    static mostraSuspeitos() {
        const suspeitos = Storage.getSuspeitos();
        suspeitos.forEach((suspeito) => Consulta.addSuspeito(suspeito));
    }

    // Função Adiciona Suspeitos na Tabela de Exibição
    static addSuspeito(suspeito) {
        const list = document.querySelector('#lista-suspeito');
        const row = document.createElement('tr');
        row.innerHTML = `
        <td><input type="checkbox" class="relatorio"></td>
        <td>${suspeito.cpf}</td>
        <td>${suspeito.nome}</td>
        <td>${suspeito.endereco}</td>
        <td>${suspeito.cidade}</td>
        <td>${suspeito.uf}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
        list.appendChild(row);
    }

    //Função Deleta Suspeitos da Tabela de Exibição
    static deleteSuspeito(el) {
        el.parentElement.parentElement.remove();
    }

}

// Evento para Deletar Suspeito ao Clicar em Delete
document.querySelector('#lista-suspeito').addEventListener('click', (e) => {
    if(e.target.classList.contains('delete')) {
        Consulta.deleteSuspeito(e.target);
        Storage.removeSuspeito(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent);
        Form.showAlert('Suspeito Removido', 'info');
    }
});

// Evento para mostrar Suspeitos no Carregamento da Página
document.addEventListener('DOMContentLoaded', Consulta.mostraSuspeitos);

// Evento para Selecionar itens do Relatorio
document.getElementById('select').onclick = function() {
    var checkboxes = document.getElementsByClassName('relatorio');
    for (var checkbox of checkboxes) {
        checkbox.checked = this.checked;
    }
    if (document.getElementById('select').checked){
        Storage.AdicionaTodosRelatorio();
    } else {
        Storage.RemoveTodosRelatorio();
    }
};

//Evento para Adicionar/Remover Itens ao Relatório
document.querySelector('#lista-suspeito').addEventListener('change', (e) => {
    if(e.target.classList.contains('relatorio')) {
        if (e.target.checked){
            Storage.AdicionaSuspeitoRelatorio(e.target.parentElement.nextElementSibling.textContent);
        } else {
            Storage.RemoveSuspeitoRelatorio(e.target.parentElement.nextElementSibling.textContent);
        }
    }
});

// Evento para Imprimir Relatório
document.querySelector("#relatorio").addEventListener("click", (e) => { 
    window.open('../views/relatorio.html');
});

