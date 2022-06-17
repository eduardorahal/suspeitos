// Função Assíncrona para Extração de Cidades da API Localidades
export default async function buscaCidade(uf) {
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
        opt.value = cidades[i].nome;
        opt.innerHTML = cidades[i].nome;
        cidade.appendChild(opt);
    }
})
.catch((error) => console.log(error));
};