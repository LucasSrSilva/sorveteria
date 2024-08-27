document.addEventListener("DOMContentLoaded", function () {
    const carrinho = document.querySelector(".carrinho tbody");
    const btnPagar = document.querySelectorAll(".opcao-pagar");
    const dadosKey = 'dados'; // Chave para armazenar os dados no localStorage

    // Função para calcular o troco
    function calcularTroco(totalCompra, valorPago) {
        return valorPago - totalCompra;
    }

    // Função para zerar o carrinho
    function zerarCarrinho() {
        document.querySelector(".preco-total").innerHTML = "0";
        carrinho.innerHTML = '';
    }

    // Função para registrar itens no carrinho e atualizar vendas
    function registrarItensCarrinho() {
        const dados = JSON.parse(localStorage.getItem(dadosKey)) || {
            vendas: { vendas: [] },
            vendasDiarias: { vendasDiarias: [] },
            vendasOperador: { vendasOperadores: [] }
        };

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
    
        dados.vendas.vendas.push({ horario: horaAtual, itens: carrinhoItens, total: precoTotal.textContent });
    
        const vendaDiaria = dados.vendasDiarias.vendasDiarias.find(venda => venda.data === dataAtual);
        if (vendaDiaria) {
            vendaDiaria.totalVendas += 1;
        } else {
            dados.vendasDiarias.vendasDiarias.push({ data: dataAtual, totalVendas: 1 });
        }

        atualizarVendasOperador(dados);

        localStorage.setItem(dadosKey, JSON.stringify(dados));
    }

    // Função para atualizar vendas do operador
    function atualizarVendasOperador(dados) {
        const operadorAtual = localStorage.getItem('operadorAtual');
        const vendaOperador = dados.vendasOperador.vendasOperadores.find(venda => venda.operador === operadorAtual);
        
        if (vendaOperador) {
            vendaOperador.totalVendas += 1;
        } else {
            dados.vendasOperador.vendasOperadores.push({ operador: operadorAtual, totalVendas: 1 });
        }
    }

    // Evento para processamento de pagamento
    btnPagar.forEach(botao => {
        botao.addEventListener("click", function () {
            const menuPagamento = document.getElementById("menu-pagamento");
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
            menuPagamento.style.display = "none";
            registrarItensCarrinho();
            zerarCarrinho();
        });
    });
});
