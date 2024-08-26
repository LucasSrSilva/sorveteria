document.addEventListener("DOMContentLoaded", function () {
    const carrinho = document.querySelector(".carrinho tbody");
    const btnPagar = document.querySelectorAll(".opcao-pagar");

    function calcularTroco(totalCompra, valorPago) {
        return valorPago - totalCompra;
    }

    function notaFiscal() {
        let itensCarrinho = [];
        const produtos = carrinho.querySelectorAll(".produto"); 
        produtos.forEach(produto => {
            const nome = produto.querySelector("#nome-produto").textContent;
            const quantidade = produto.querySelector("#quantidade-produto").textContent;
            const valor = produto.querySelector("#valor-produto").textContent;

            itensCarrinho.push({
                nome,
                quantidade,
                valor
            })
        })
        console.log(itensCarrinho);
    }


    btnPagar.forEach(btn => {
        btn.addEventListener("click", notaFiscal);

    })

})