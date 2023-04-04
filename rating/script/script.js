var telaInicial = document.getElementById('tela-inicial')
var mensagem = document.getElementById('mensagem')
var notaRecebida = document.getElementById('nota-recebida')

var avaliacao = ''

function avaliar(nota) {
    avaliacao = nota

}

function enviar() {
    if (avaliacao.length == 0) {
        window.alert('ERROR! Please rate before continuing')
    } else {
        notaRecebida.innerText = avaliacao
        telaInicial.style.display = 'none'
        mensagem.style.display = 'block'
    }
}