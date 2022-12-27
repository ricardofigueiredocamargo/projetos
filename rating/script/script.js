let avaliacao = document.querySelector('div#avaliacao')
let resultado = document.querySelector('div#resultado')
let frase = document.querySelector('p#frase')
let num = 0

function clicouNum(n) {
    num = n
}

function clicouBotao() {
    if (num == 0) {
        window.alert('Please, choose a number.')
    } else {
        avaliacao.style.display = 'none'
        resultado.style.display = 'block'
    
        frase.innerHTML = `You selected ${num} out of 5`
    }
}