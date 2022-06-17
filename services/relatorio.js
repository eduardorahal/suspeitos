import Storage from "./storage.js";
import Token from "./token.js";

// Evento para Validar o Token
const token = new Token();

// Classe Consulta - Tabela de Exibição de Suspeitos - UI
export default class Consulta {

    //Função Mostra Suspeitos
    static mostraSuspeitos() {
        const suspeitos = Storage.getRelatorio();
        suspeitos.forEach((suspeito) => Consulta.addSuspeito(suspeito));
    }

    // Função Adiciona Suspeitos na Tabela de Exibição
    static addSuspeito(suspeito) {
        const list = document.querySelector('#lista-suspeito');
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${suspeito.cpf}</td>
        <td>${suspeito.nome}</td>
        <td>${suspeito.endereco}</td>
        <td>${suspeito.cidade}</td>
        <td>${suspeito.uf}</td>
        `;
        list.appendChild(row);
    }

}
  

// Evento para mostrar Suspeitos no Carregamento da Página
document.addEventListener('DOMContentLoaded', Consulta.mostraSuspeitos);
document.addEventListener('DOMContentLoaded', window.print());
