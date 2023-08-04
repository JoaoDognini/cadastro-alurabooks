const campoCep = document.getElementById('cep');

async function buscaEndereco(cep) {
    var mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = "";
    try {        
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        var consultaCEPConvertida = await consultaCEP.json();
        
        if (consultaCEPConvertida.erro) throw Error('CEP não existente');

        setDadosCep(consultaCEPConvertida);
        return consultaCEPConvertida
    } catch (erro) {
        mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente!</p>`;
    }
}

function setDadosCep(dadosCEP) {
    var cidade = document.getElementById('cidade');
    var bairro = document.getElementById('bairro');
    var estado = document.getElementById('estado');
    var logradouro = document.getElementById('endereco');
    
    cidade.value = dadosCEP.localidade;
    bairro.value = dadosCEP.bairro;
    estado.value = dadosCEP.uf
    logradouro.value = dadosCEP.logradouro;
};

campoCep.addEventListener("focusout", () => buscaEndereco(cep.value))