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
    let saborEscolhido;

    menuFechar.forEach(botao => {
        botao.addEventListener('click', function () {
            menuPagamento.style.display = "none";
            menuSabores.style.display = "none";
        })
    })

    opcaoProduto.forEach(botao => {
        botao.addEventListener("click", function () {
            produtoEscolhido = botao.textContent
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
                    <td id="quant-produto">1</td>
                    <td id="valor-produto">R$6</td>
                </tr>
                `
            carrinho.insertAdjacentHTML("beforeend", novoProduto);
            carrinhoContainer.scrollTop = carrinhoContainer.scrollHeight;
        })
    })

    pagar.addEventListener("click", function () {
        menuPagamento.style.display = "flex"
    })



})