import { operacao, vendas, vendasDiarias, vendasOperador } from "./dados.js";

document.addEventListener("DOMContentLoaded", function () {

    document.querySelector(".logout").addEventListener("click", function() {
        window.location.href = "index.html"
    })

    document.querySelector(".estoque").addEventListener("click", function() {
        window.location.href = "estoque.html"
    });

    document.getElementById('iniciarOperacao').addEventListener('click', function () {

        const codigoOperador = document.getElementById("codigoOperador").value;
        const operador = operacao.operadores.find(op => op.codigo === codigoOperador)

        if (operador) {
            localStorage.setItem("operadorAtual", operador.nome);
            window.location.href = 'caixa.html';
        } else {
            alert('Código de operador inválido.');
        }
    })

    const listaVendasDia = document.getElementById("lista-vendas-dia");
    vendas.vendas.forEach(venda => {
        const item = document.createElement("li");
        item.textContent = `${venda.horario}: ${venda.itens} - Total: R$${venda.total}`;
                listaVendasDia.appendChild(item);
    })
    

    const listaVendasMes = document.getElementById("lista-vendas-mes");
    vendasDiarias.vendasDiarias.forEach(venda => {
        const item = document.createElement("li");
        item.textContent = `${venda.data} - ${venda.totalVendas} vendas`;
        listaVendasMes.appendChild(item);
    })
    

    const vendasOperadores = JSON.parse(localStorage.getItem('vendasOperadores'));
    console.log(vendasOperadores);
    const listaVendasOperador = document.getElementById("lista-vendas-operador");
    vendasOperador.vendasOperadores.forEach( venda => {
        const item = document.createElement("li");
        item.textContent = `${venda.operador} - ${venda.totalVendas} vendas`;
        listaVendasOperador.appendChild(item);

    })
  
})