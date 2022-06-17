// Classe Storage para Armazenar Dados de Suspeitos em Local Storage

export default class Storage {

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

    // Função Adiciona Token de Acesso
    static addToken() {
        localStorage.setItem('token', 1);
    }

    // Função Busca Relatorio
    static getRelatorio() {
        let relatorio;
        if(localStorage.getItem('relatorio') === null) {
            relatorio = [];
            } else {
                relatorio = JSON.parse(localStorage.getItem('relatorio'));
        }
        return relatorio;
    }

    // Função Adiciona Suspeito ao Relatório
    static AdicionaSuspeitoRelatorio(cpf) {
        const suspeitos = Storage.getSuspeitos();
        const relatorio = Storage.getRelatorio();
        suspeitos.forEach((suspeito) => {
            if(suspeito.cpf === cpf) {
                relatorio.push(suspeito);
            }
        });
        localStorage.setItem('relatorio', JSON.stringify(relatorio));
    }
    
    // Adiciona Todos ao Relatorio
    static AdicionaTodosRelatorio(){
        const suspeitos = Storage.getSuspeitos();
        localStorage.setItem('relatorio', JSON.stringify(suspeitos));
    }

    // Função Remove Suspeito do Relatório
    static RemoveSuspeitoRelatorio(cpf) {
        const relatorio = Storage.getRelatorio();
        relatorio.forEach((suspeito, index) => {
            if(suspeito.cpf === cpf) {
                relatorio.splice(index, 1);
            }
        });
        localStorage.setItem('relatorio', JSON.stringify(relatorio));
    }

    // Remove Todos do Relatorio
    static RemoveTodosRelatorio(){
        localStorage.setItem('relatorio', JSON.stringify([]));
    }

}