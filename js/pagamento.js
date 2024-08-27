import { vendasOperador, vendasDiarias, vendas } from "./dados.js";

document.addEventListener("DOMContentLoaded", function () {
    const carrinho = document.querySelector(".carrinho tbody");
    const btnPagar = document.querySelectorAll(".opcao-pagar");

    function calcularTroco(totalCompra, valorPago) {
        return valorPago - totalCompra;
    }

    function zerarCarrinho() {
        document.querySelector(".preco-total").innerHTML = "0";
        carrinho.innerHTML = '';
    }

    function registrarItensCarrinho() {
        const carrinhoItens = [];
        const produtos = document.querySelectorAll(".produto");
        const precoTotal = document.querySelector(".preco-total");
    
        produtos.forEach(produto => {
            const nome = produto.querySelector("#nome-produto").textContent;
            const quantidade = parseInt(produto.querySelector("#quantidade-produto").textContent);
            const valor = parseFloat(produto.querySelector("#valor-produto").textContent.replace("R$", ""));
            carrinhoItens.push({ nome, quantidade, valor });
        });
    
        const dataAtual = new Date().toISOString().slice(0, 10); // Formato YYYY-MM-DD
        const horaAtual = new Date().toLocaleTimeString();
    
        vendas.vendas.push({ horario: horaAtual, itens: carrinhoItens, total: precoTotal.textContent });
    
        const vendaDiaria = vendasDiarias.vendasDiarias.find(venda => venda.data === dataAtual);
        if (vendaDiaria) {
            vendaDiaria.totalVendas += 1;
        } else {
            vendasDiarias.vendasDiarias.push({ data: dataAtual, totalVendas: 1 });
        }

        atualizarVendasOperador();
    }

    function atualizarVendasOperador() {
        const operadorAtual = localStorage.getItem('operadorAtual');
        const vendaOperador = vendasOperador.vendasOperadores.find(venda => venda.operador == operadorAtual)
        vendaOperador.totalVendas += 1
        localStorage.setItem('vendasOperadores', JSON.stringify(vendaOperador));
        console.log(vendaOperador)
        
    }


    btnPagar.forEach(botao => {
        botao.addEventListener("click", function () {
            const totalCompra = parseFloat(document.querySelector(".preco-total").textContent.replace("R$", ""));
            if (botao.classList.contains("dinheiro")) {
                const valorPago = parseFloat(prompt("Digite o valor pago:"));
                if (valorPago >= totalCompra) {
                    const troco = calcularTroco(totalCompra, valorPago);
                    alert("Troco: R$" + troco.toFixed(2));
                } else {
                    alert("Valor pago é insuficiente.");
                }
            }
            // Registrar a venda e zerar o carrinho
            registrarItensCarrinho();
            zerarCarrinho();
        });
    });
});