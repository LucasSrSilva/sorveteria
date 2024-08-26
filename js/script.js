document.addEventListener("DOMContentLoaded", function () {
    const menuSabores = document.getElementById("menu-sabores");
    const menuPagamento = document.getElementById("menu-pagamento");
    const opcaoProduto = document.querySelectorAll(".opcao-produto")
    const opcaoSabor = document.querySelectorAll(".opcao-sabor")
    const menuFechar = document.querySelectorAll(".menu-fechar");
    const carrinho = document.querySelector(".carrinho tbody");
    const carrinhoContainer = document.querySelector(".carrinho");
    const pagar = document.querySelector(".pagar");
    let produtoEscolhido;
    let produtoEscolhidoValor = 0;
    let saborEscolhido;
    let precoTotal = 0;

    menuFechar.forEach(botao => {
        botao.addEventListener('click', function () {
            menuPagamento.style.display = "none";
            menuSabores.style.display = "none";
        })
    })

    opcaoProduto.forEach(botao => {
        botao.addEventListener("click", function () {
            produtoEscolhido = botao.textContent
            switch (produtoEscolhido) {
                case "Casquinha":
                    produtoEscolhidoValor = 3;
                    precoTotal += 3;
                    break;
                case "Sundae":
                    produtoEscolhidoValor = 6;
                    precoTotal += 6;
                    break;
                case "MilkShake":
                    produtoEscolhidoValor = 9;
                    precoTotal += 9;
                    break;
                default:
                    alert("por favor reinicie a página");
                    break;
            }
            const tituloMenu = document.getElementById("produto-titulo");
            tituloMenu.textContent = produtoEscolhido;
            menuSabores.style.display = "flex"
        })
    })

    opcaoSabor.forEach(botao => {
        botao.addEventListener("click", function () {
            saborEscolhido = botao.textContent
            menuSabores.style.display = "none"
            const novoProduto = `
                <tr class="produto">
                    <td id="nome-produto">${produtoEscolhido} de ${saborEscolhido}</td>
                    <td id="quantidade-produto">1</td>
                    <td id="valor-produto">R$${produtoEscolhidoValor}</td>
                </tr>
                `
            carrinho.insertAdjacentHTML("beforeend", novoProduto);
            carrinhoContainer.scrollTop = carrinhoContainer.scrollHeight;

            const valorTotal = document.querySelector(".preco-total");
            valorTotal.textContent = `R$${precoTotal}`
        })
    })

    pagar.addEventListener("click", function () {
        menuPagamento.style.display = "flex"
    })



})