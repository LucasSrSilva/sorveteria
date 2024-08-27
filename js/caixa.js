document.addEventListener("DOMContentLoaded", function () {
    const menuSabores = document.getElementById("menu-sabores");
    const menuPagamento = document.getElementById("menu-pagamento");
    const opcaoProduto = document.querySelectorAll(".opcao-produto");
    const menuFechar = document.querySelectorAll(".menu-fechar");
    const carrinho = document.querySelector(".carrinho tbody");
    const carrinhoContainer = document.querySelector(".carrinho");
    const pagar = document.querySelector(".pagar");
    const opcoesSabores = document.querySelector(".opcoes__sabores");
    const btnPagar = document.querySelectorAll(".opcao-pagar");
    let precoTotal = 0;
    let opcaoSabor;
    let produtoEscolhido;
    let produtoEscolhidoValor = 0;
    let saborEscolhido;
    let sabores;
    
    async function fetchDados() {
        try {
            const response = await fetch('docs/dados.json');
            if (!response.ok) throw new Error('Erro ao carregar dados');
            const dados = await response.json();
            window.dados = dados; // Armazena dados globalmente para uso posterior
            console.log('Dados carregados:', dados);
            iniciar();
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    }

    function iniciar() {
        document.querySelector(".logout").addEventListener("click", function () {
            window.location.href = "gerencia.html";
        });
        
        const nomeOperador = localStorage.getItem('operadorAtual');
        if (nomeOperador) {
            document.getElementById('nomeOperador').textContent = nomeOperador;
        } else {
            alert('Nenhum operador encontrado!');
        }

        menuFechar.forEach(botao => {
            botao.addEventListener('click', function () {
                menuPagamento.style.display = "none";
                menuSabores.style.display = "none";
            });
        });

        opcaoProduto.forEach(botao => {
            botao.addEventListener("click", function () {
                produtoEscolhido = botao.textContent;
                switch (produtoEscolhido) {
                    case "Casquinha":
                        produtoEscolhidoValor = 3;
                        precoTotal += 3;
                        sabores = `
                <button class="opcao opcao-sabor">chocolate</button>
                <button class="opcao opcao-sabor">creme</button>
                <button class="opcao opcao-sabor">Misto</button>
                `;
                        break;
                    case "Sundae":
                        produtoEscolhidoValor = 6;
                        precoTotal += 6;
                        sabores = `
                <button class="opcao opcao-sabor">Chocolate</button>
                <button class="opcao opcao-sabor">Frutas vermelhas</button>
                <button class="opcao opcao-sabor">Morango</button>
                <button class="opcao opcao-sabor">Caramelo</button>
                <button class="opcao opcao-sabor">Ice Blue</button>
                <button class="opcao opcao-sabor">Tutti Frutty</button>
                <button class="opcao opcao-sabor">Limão</button>
                <button class="opcao opcao-sabor">Leite Condensado</button>
                `;
                        break;
                    case "MilkShake":
                        produtoEscolhidoValor = 9;
                        precoTotal += 9;
                        sabores = `
                <button class="opcao opcao-sabor">Chocolate</button>
                <button class="opcao opcao-sabor">Ovomaltine</button>
                <button class="opcao opcao-sabor">Morango</button>
                <button class="opcao opcao-sabor">Doce de leite</button>
                <button class="opcao opcao-sabor">Banana</button>
                <button class="opcao opcao-sabor">Farinha Láctea</button>
                <button class="opcao opcao-sabor">Maracujá</button>
                <button class="opcao opcao-sabor">Limão</button>
                <button class="opcao opcao-sabor">Menta</button>
                <button class="opcao opcao-sabor">Café</button>
                
                `;
                        break;
                    default:
                        alert("Por favor, reinicie a página");
                        break;
                }
                const tituloMenu = document.getElementById("produto-titulo");
                tituloMenu.textContent = produtoEscolhido;
                opcoesSabores.innerHTML = sabores;
                menuSabores.style.display = "flex";
                opcaoSabor = document.querySelectorAll(".opcao-sabor");

                opcaoSabor.forEach(botao => {
                    botao.addEventListener("click", function () {
                        saborEscolhido = botao.textContent;
                        menuSabores.style.display = "none";
                        const novoProduto = `
                            <tr class="produto">
                                <td id="nome-produto">${produtoEscolhido} de ${saborEscolhido}</td>
                                <td id="quantidade-produto">1</td>
                                <td id="valor-produto">R$${produtoEscolhidoValor}</td>
                            </tr>
                            `;
                        carrinho.insertAdjacentHTML("beforeend", novoProduto);
                        carrinhoContainer.scrollTop = carrinhoContainer.scrollHeight;

                        const valorTotal = document.querySelector(".preco-total");
                        valorTotal.textContent = `${precoTotal}`;
                    });
                });
            });
        });

        pagar.addEventListener("click", function () {
            menuPagamento.style.display = "flex";
        });
        btnPagar.forEach(botao => {
            botao.addEventListener("click", function () {
                precoTotal = 0
            })})
    }

    fetchDados();
});