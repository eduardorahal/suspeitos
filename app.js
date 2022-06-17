
// Função Assíncrona para Extração de UFs da API Localidades
async function buscaUF() {
    await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome',{
        "method": "GET"
    })
    .then((res) => res.json())
    .then((ufs) => {
        const uf = document.querySelector('#uf');
        for ( var i = 0; i < ufs.length; i++) {
            var opt = document.createElement("option");
            opt.value = ufs[i].sigla;
            opt.innerHTML = ufs[i].sigla;
            uf.appendChild(opt);
        }
    })
    .catch((error) => console.log(error));
};


// Função Assíncrona para Extração de Cidades da API Localidades
async function buscaCidade(uf) {
    await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados/'+uf+'/municipios/',{
        "method": "GET"
    })
    .then((res) => res.json())
    .then((cidades) => {
        const cidade = document.querySelector('#cidade');
        cidade.removeAttribute("disabled");
        cidade.innerHTML = "";
        for ( var i = 0; i < cidades.length; i++) {
            var opt = document.createElement("option");
            opt.value = cidades[i].id;
            opt.innerHTML = cidades[i].nome;
            cidade.appendChild(opt);
        }
    })
    .catch((error) => console.log(error));
};


// Cria Classe Suspeito

class Suspeito {
    constructor(nome, cpf, endereco, cidade, uf) {
        this.nome = nome;
        this.cpf = cpf;
        this.endereco = endereco;
        this.cidade = cidade;
        this.uf = uf;
    }
}


// Classe Tabela de Exibição de Suspeitos - UI

class Tabela {

    //Função Mostra Suspeitos
    static mostraSuspeitos() {
        const suspeitos = Storage.getSuspeitos();
        suspeitos.forEach((suspeito) => Tabela.addSuspeito(suspeito));
    }

    // Função Adiciona Suspeitos na Tabela de Exibição - UI
    static addSuspeito(suspeito) {
        const list = document.querySelector('#lista-suspeito');
        const row = document.createElement('tr');
        row.innerHTML = `
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
        if(el.classList.contains('delete')) {
        el.parentElement.parentElement.remove();
        }
    }

    // Função Mostra Alertas

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#form-suspeito');
        container.insertBefore(div, form);
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    // Função Limpa Campos

    static limpaCampos() {
        document.querySelector('#nome').value = '';
        document.querySelector('#cpf').value = '';
        document.querySelector('#endereco').value = '';
        document.querySelector('#cidade').value = '';
        document.querySelector('#uf').value = '';
    }
}


// Classe Storage para Armazenar Dados de Suspeitos em Local Storage

class Storage {

    // Função Busca Suspeitos no Storage
     
    static getSuspeitos() {
        let suspeitos;
        if(localStorage.getItem('suspeitos') === null) {
        suspeitos = [];
        } else {
        suspeitos = JSON.parse(localStorage.getItem('suspeitos'));
        }
        return suspeitos;
    }

    // Função Adiciona Suspeito ao Storage

    static addSuspeito(suspeito) {
        const suspeitos = Storage.getSuspeitos();
        suspeitos.push(suspeito);
        localStorage.setItem('suspeitos', JSON.stringify(suspeitos));
    }

    // Função Remove Suspeito do Storage

    static removeSuspeito(cpf) {
        const suspeitos = Storage.getSuspeitos();
        suspeitos.forEach((suspeito, index) => {
        if(suspeito.cpf === cpf) {
            suspeitos.splice(index, 1);
        }
        });
        localStorage.setItem('suspeitos', JSON.stringify(suspeitos));
    }
}


// Evento para mostrar Suspeitos no Carregamento da Página

document.addEventListener('DOMContentLoaded', buscaUF());
document.addEventListener('DOMContentLoaded', Tabela.mostraSuspeitos);



// Evento para Adicionar um Suspeito ao Submeter o Formulário

document.querySelector('#form-suspeito').addEventListener('submit', (e) => {
    e.preventDefault();

    // Extrair dados do Formulário
    
    const nome = document.querySelector('#nome').value;
    const cpf = document.querySelector('#cpf').value;
    const endereco = document.querySelector('#endereco').value;
    const cidade = document.querySelector('#cidade').value;
    const uf = document.querySelector('#uf').value;


    // Validação de Preenchimento

    if(nome === '' || cpf === '' || endereco === '' || cidade === '' || uf === '') {
        UI.showAlert('Preencha todos os campos', 'danger');
    } else {
        const suspeito = new Suspeito(nome, cpf, endereco, cidade, uf);

        Tabela.addSuspeito(suspeito);

        Storage.addSuspeito(suspeito);

        Tabela.showAlert('Suspeito Cadastrado', 'success');

        Tabela.limpaCampos();
    }
});


// Evento ao Clicar em Remoção de Suspeito

document.querySelector('#lista-suspeito').addEventListener('click', (e) => {

    Tabela.deleteSuspeito(e.target);

    Storage.removeSuspeito(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent);

    Tabela.showAlert('Suspeito Removido', 'info');
});

module.exports(buscaUF, buscaCidade);