var largura = 0
var altura = 0
var vidas = 1
var tempo = 15

// AJUSTANDO PALCO DO JOGO
function ajustaPalcoJogo() {
    largura = window.innerWidth
    altura = window.innerHeight
}

ajustaPalcoJogo()

// AJUSTANDO NÍVEL
var nivel = window.location.search
nivel = nivel.replace('?', '')

var nivelMosquito = 1500
if (nivel === 'normal') {
    nivelMosquito = 1500
} else if (nivel === 'dificil') {
    nivelMosquito = 1000
} else if (nivel === 'chucknorris') {
    nivelMosquito = 800
}

// CRONOMETRO
document.getElementById('cronometro').innerHTML = tempo

var cronometro = setInterval(function() {
    if (tempo == 0) {
        clearInterval(iniciouJogo)
        clearInterval(cronometro)
        window.location.href = 'vitoria.html'
    } else {
        tempo--
        document.getElementById('cronometro').innerHTML = tempo
    }
}, 1000)

function posicaoRandomica() {
    // ELIMINANDO MOSQUITO ANTERIOR
    if (document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove()
        if (vidas > 3) {
            clearInterval(iniciouJogo)
            clearInterval(cronometro)
            window.location.href = 'game-over.html'
        } else {
            var coracao = document.getElementById('v' + vidas)
            coracao.src = 'imagens/coracao_vazio.png'
            vidas++
        }
    }

    // GERANDO POSIÇÃO ALEATÓRIA
    var posicaoX = Math.floor(Math.random() * largura) - 100
    var posicaoY = Math.floor(Math.random() * altura) - 100

    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY

    // GERANDO MOSQUITO
    var mosquito = document.createElement('img')
    mosquito.src = 'imagens/mosquito.png'
    mosquito.classList.add(classeMosquito(), ladoMosquito())
    mosquito.style.position = 'absolute'
    mosquito.style.top = posicaoY + 'px'
    mosquito.style.left = posicaoX + 'px'
    mosquito.id = 'mosquito'
    mosquito.addEventListener('click', matou)

    document.body.appendChild(mosquito)
}

posicaoRandomica()

// CRIANDO CLASSES RANDÔMICAS PARA O MOSQUITO
function classeMosquito() {
    var classeMosquito = Math.floor(Math.random() * 3)
    switch (classeMosquito) {
        case 0:
            return 'mosquito1'
        case 1:
            return 'mosquito2'    
        case 2: 
            return 'mosquito3'    
    }
}

// CRIANDO LADOS RANDÔMICOS PARA O MOSQUITO
function ladoMosquito() {
    var lado = Math.floor(Math.random() * 2)
    switch (lado) {
        case 0:
            return 'ladoA'
        case 1:
            return 'ladoB'        
    }
}

// REMOVENDO O MOSQUITO
function matou() {
    this.remove()
}