export default class Token {
    constructor() {
        document.querySelector("body").style.display = "none";
        const token = localStorage.getItem("token");
        this.validaToken(token);
    }
    
    // Valida Autenticação
    validaToken(token) {
        if (token != 1) {
            window.location.replace("http://localhost/suspeitos/views/login.html");
        } else {
            document.querySelector("body").style.display = "block";
        }
    }
    
    // Função para fazer Logout
    logout() {
        localStorage.removeItem("token");
        window.location.replace("http://localhost/suspeitos/views/login.html");
    }
}