var telaInicial = document.getElementById('tela-inicial')
var mensagem = document.getElementById('mensagem')
var notaRecebida = document.getElementById('nota-recebida')

var avaliacao = 0

function avaliar(nota) {
    avaliacao = nota

}

function enviar() {
    if (avaliacao == 0) {
        window.alert('ERROR! Please rate before continuing')
    } else {
        notaRecebida.innerText = avaliacao
        telaInicial.style.display = 'none'
        mensagem.style.display = 'block'
    }
}