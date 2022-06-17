// Função Assíncrona para Extração de UFs da API Localidades
export default async function buscaUF() {
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
            if (ufs[i].sigla === "SC") { opt.selected = "selected"};
            uf.appendChild(opt);
        }
    })
    .catch((error) => console.log(error));
};