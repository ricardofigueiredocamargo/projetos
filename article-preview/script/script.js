// selectors
const botaoCompartilhar = document.querySelector('.btn-share')
const redesSociais = document.querySelector('.compartilhar')

// handlers
let removerEstiloBotao = () => {
    if (botaoCompartilhar.classList.contains('clicou-botao-mobile')) {
        botaoCompartilhar.classList.remove('clicou-botao-mobile')
    }
    if (botaoCompartilhar.classList.contains('clicou-botao-desktop')) {
        botaoCompartilhar.classList.remove('clicou-botao-desktop')
    }
}

let removerCompartilhar = () => {
    redesSociais.classList.remove('display-flex')
}

// functions
function mudouTamanhoTela() {
    removerEstiloBotao()
    removerCompartilhar()
}

function compartilhar() {
    redesSociais.classList.toggle('display-flex')

    if (window.innerWidth < 850) {
        botaoCompartilhar.classList.toggle('clicou-botao-mobile')
    } else {
        botaoCompartilhar.classList.toggle('clicou-botao-desktop')
    }
}