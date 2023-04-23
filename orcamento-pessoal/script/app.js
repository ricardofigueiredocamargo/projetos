// CLASSES ---------------------------------------------
class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() {
        for (let i in this) {
            if (this[i] == '' || this[i] == null || this[i] == undefined) {
                return false
            }
        }
        return true
    }
}

class Bd {
    constructor() {
        this.id = localStorage.getItem('id')

        if (this.id == null) {
            localStorage.setItem('id', 0)
        }
    }

    gravar(d) {
        this.id++
        localStorage.setItem(this.id, JSON.stringify(d))
        localStorage.setItem('id', this.id)
    }

    recuperarTodosResgistros() {
        for (let i = 1; i <= this.id; i++) {
            let despesa = JSON.parse(localStorage.getItem(i))

            if (despesa !== null) {
                despesa.id = i
                todasDespesas.push(despesa)
            }
        }
    }
}

class Modal {
    constructor() {
        this.titulo = document.querySelector('#titulo-modal')
        this.desricao = document.querySelector('#descricao-modal')
        this.botao = document.querySelector('#botao-modal')
    }

    erroGravacao() {
        this.titulo.classList.add('text-danger')
        this.botao.classList.add('btn-danger')

        this.titulo.innerHTML = `Erro na gravação`
        this.desricao.innerHTML = `Existem campos obrigatórios que não foram preenchidos!`
        this.botao.innerHTML = `Voltar e corrigir`
    }

    sucessoGravacao() {
        this.titulo.classList.add('text-success')
        this.botao.classList.add('btn-success')
        this.botao.addEventListener('click', limparDados)

        this.titulo.innerHTML = `Registro inserido com sucesso`
        this.desricao.innerHTML = `Despesa foi cadastrada com sucesso!`
        this.botao.innerHTML = `Voltar`
    }

    removerClasses() {
        if (this.titulo.classList.contains('text-danger')) {
            this.titulo.classList.remove('text-danger')
            this.botao.classList.remove('btn-danger')
        }

        if (this.titulo.classList.contains('text-success')) {
            this.titulo.classList.remove('text-success')
            this.botao.classList.remove('btn-success')
            this.botao.removeEventListener('click', limparDados)
        }
    }
}

// VARIÁVEIS --------------------------------------------
let bd = new Bd()

let modal = new Modal()

let todasDespesas = []

let listaDespesas = document.querySelector('#lista-despesas')

// FUNÇÕES PRINCIPAIS -----------------------------------
function registrarDespesa() {
    let ano = document.querySelector('#iano')
    let mes = document.querySelector('#imes')
    let dia = document.querySelector('#idia')
    let tipo = document.querySelector('#itipo')
    let descricao = document.querySelector('#idescricao')
    let valor = document.querySelector('#ivalor')

    let despesa = new Despesa(
        ano.value, 
        mes.value, 
        dia.value, 
        tipo.value, 
        descricao.value,
        valor.value
    )

    modal.removerClasses()

    if (despesa.validarDados()) {
        bd.gravar(despesa)
        modal.sucessoGravacao()
        $('#modal').modal('show')
    } else {
        modal.erroGravacao()
        $('#modal').modal('show')
    }
}

function mostrarListaDespesas() {
    bd.recuperarTodosResgistros()

    carregaListaDespesas(todasDespesas)
}

function carregaListaDespesas(lista) {
    lista.forEach((d) => {
        d.dia = ajustarDiaMes(d.dia)
        d.mes = ajustarDiaMes(d.mes)
        d.tipo = ajustarTipo(d.tipo)
        d.valor = ajustarValor(d.valor)

        let linha = listaDespesas.insertRow()
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor

        let btn = document.createElement('button')
        btn.className = 'btn btn-danger btn-sm'
        btn.innerHTML = `<i class="fa-solid fa-xmark"></i>`
        btn.addEventListener('click', () => {
            
        })
        linha.insertCell(4).appendChild(btn)
    })
}

// FUNÇÕES SECUNDÁRIAS ----------------------------------
let limparDados = () => {
    document.querySelector('#iano').value = ''
    document.querySelector('#imes').value = ''
    document.querySelector('#idia').value = ''
    document.querySelector('#itipo').value = ''
    document.querySelector('#idescricao').value = ''
    document.querySelector('#ivalor').value = ''
}

function ajustarDiaMes(num) {
    if (num < 10) {
        num = 0 + num
    }
    return num
}

function ajustarTipo(tipo) {
    switch (tipo) {
        case '1':
            tipo = 'Alimentação'
            break
        case '2':
            tipo = 'Educação'
            break
        case '3': 
            tipo = 'Lazer'
            break
        case '4': 
            tipo = 'Saúde'
            break
        case '5':
            tipo = 'Transporte'
            break              
    }
    return tipo
}

function ajustarValor(valor) {
    valor = Number(valor)
    valor = valor.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
    return valor
}