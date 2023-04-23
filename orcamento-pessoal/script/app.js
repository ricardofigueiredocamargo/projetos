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

    removerItem(id) {
        localStorage.removeItem(id)
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

        this.titulo.innerHTML = `Erro`
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

    removerDespesa() {
        this.titulo.classList.add('text-warning')
        this.botao.classList.add('btn-warning')
        this.botao.addEventListener('click', recarregarPagina)

        this.titulo.innerHTML = `Despesa removida`
        this.desricao.innerHTML = `A sua despesa foi removida com sucesso!`
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

        if (this.titulo.classList.contains('text-warning')) {
            this.titulo.classList.remove('text-warning')
            this.botao.classList.remove('btn-warning')
            this.botao.removeEventListener('click', recarregarPagina)
        }
    }
}

// VARIÁVEIS --------------------------------------------
let bd = new Bd()

let modal = new Modal()

let todasDespesas = []

let listaDespesas = document.querySelector('#lista-despesas')

let valorTotal = document.querySelector('#valor-total')

let resultadoPesquisaValor = document.querySelector('#resultado-pesquisa-valor')

let filtroSelecionado = document.querySelector('#filtro-selecionado')

let valorGasto = document.querySelector('#valor-gasto')

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

function pesquisarDespesa() {
    let ano = document.querySelector('#iano').value
    let mes = document.querySelector('#imes').value
    let dia = document.querySelector('#idia').value
    let tipo = document.querySelector('#itipo').value
    let descricao = document.querySelector('#idescricao').value
    let valor = document.querySelector('#ivalor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    let despesaFiltrada = filtrar(despesa)

    listaDespesas.innerHTML = ''

    carregaListaDespesas(despesaFiltrada)
}

function carregaListaDespesas(lista) {
    lista.forEach((d) => {
        let dia = ajustarDiaMes(d.dia)
        let mes = ajustarDiaMes(d.mes)
        let tipo = ajustarTipo(d.tipo)
        let valor = ajustarValor(d.valor)

        let linha = listaDespesas.insertRow()
        linha.insertCell(0).innerHTML = `${dia}/${mes}/${d.ano}`
        linha.insertCell(1).innerHTML = tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = valor

        let btn = document.createElement('button')
        btn.className = 'btn btn-danger btn-sm'
        btn.innerHTML = `<i class="fa-solid fa-xmark"></i>`
        btn.addEventListener('click', () => {
            bd.removerItem(d.id)
            modal.removerDespesa()
            $('#modal').modal('show')
        })
        linha.insertCell(4).appendChild(btn)
    })
}

function recuperarValorTotal() {
    bd.recuperarTodosResgistros()

    let valores = 0

    todasDespesas.forEach((d) => {
        valores += Number(d.valor)
    })

    if (valores > 10000) {
        valores = ajustarValor(valores)
        valorTotal.innerHTML = `${valores} 😨`
    } else {
        valores = ajustarValor(valores)
        valorTotal.innerHTML = `${valores}`
    }
}

function pesquisarValor() {
    let ano = document.querySelector('#iano').value
    let tipo = document.querySelector('#itipo').value
    let mes = ''
    let dia = ''
    let descricao = ''
    let valor = ''

    if (ano == '' && tipo == '') {
        modal.erroGravacao()
        $('#modal').modal('show')
    } else {
        if (resultadoPesquisaValor.classList.contains('d-none')) {
            resultadoPesquisaValor.classList.remove('d-none')
        }

        let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

        let despesaFiltrada = filtrar(despesa)

        let valores = 0

        despesaFiltrada.forEach((d) => {
            valores += Number(d.valor)
        })

        tipo = ajustarTipo(tipo)
        valores = ajustarValor(valores)

        if (ano == '') {
            filtroSelecionado.innerHTML = `em ${tipo}`
        } else if (tipo == '') {
            filtroSelecionado.innerHTML = `em ${ano}`
        } else {
            filtroSelecionado.innerHTML = `em ${tipo} em ${ano}`
        }

        valorGasto.innerHTML = `${valores}`
    }
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

let recarregarPagina = () => {
    modal.removerClasses()
    window.location.reload()
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

function filtrar(despesa) {
    let despesaFiltrada = todasDespesas

    // ano
    if (despesa.ano !== '') {
        despesaFiltrada = despesaFiltrada.filter(d => d.ano == despesa.ano)
    }
    
    // mes
    if (despesa.mes !== '') {
        despesaFiltrada = despesaFiltrada.filter(d => d.mes == despesa.mes)
    }

    // dia 
    if (despesa.dia !== '') {
        despesaFiltrada = despesaFiltrada.filter(d => d.dia == despesa.dia)
    }

    // tipo 
    if (despesa.tipo !== '') {
        despesaFiltrada = despesaFiltrada.filter(d => d.tipo == despesa.tipo)
    }

    // descricao
    if (despesa.descricao !== '') {
        despesaFiltrada = despesaFiltrada.filter(d => d.descricao == despesa.descricao)
    }

    // valor
    if (despesa.valor !== '') {
        despesaFiltrada = despesaFiltrada.filter(d => d.valor == despesa.valor)
    }

    return despesaFiltrada
}