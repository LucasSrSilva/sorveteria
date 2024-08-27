document.addEventListener("DOMContentLoaded", function () {
    async function fetchDados() {
        try {
            const response = await fetch('docs/dados.json');
            if (!response.ok) throw new Error('Erro ao carregar dados');
            const dados = await response.json();

            // Atualiza a variável global com os dados carregados
            window.dados = dados;
            console.log('Dados carregados:', dados);
            
            ;
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    }

    const listaVendasOperador = document.getElementById("lista-vendas-operador");
    const listaVendasDia = document.getElementById("lista-vendas-dia");
    const listaVendasMes = document.getElementById("lista-vendas-mes");

    // Função para atualizar a lista de vendas dos operadores
    function atualizarListaVendasOperador() {
        const dados = JSON.parse(localStorage.getItem('dados')) || {
            vendasOperador: { vendasOperadores: [] }
        };
        listaVendasOperador.innerHTML = ''; // Limpa a lista antes de adicionar novos itens

        dados.vendasOperador.vendasOperadores.forEach(venda => {
            const item = document.createElement("li");
            item.textContent = `${venda.operador} - ${venda.totalVendas} vendas`;
            listaVendasOperador.appendChild(item);
        });
    }

    // Função para atualizar a lista de vendas do dia
    function atualizarListaVendasDia() {
        const dados = JSON.parse(localStorage.getItem('dados')) || {
            vendas: { vendas: [] }
        };
        listaVendasDia.innerHTML = ''; // Limpa a lista antes de adicionar novos itens

        dados.vendas.vendas.forEach(venda => {
            const item = document.createElement("li");
            // Verifica se 'itens' é um array e formata o texto corretamente
            const itensTexto = Array.isArray(venda.itens) 
                ? venda.itens.map(item => `${item.nome}`).join(', ')
                : venda.itens;

            item.textContent = `${venda.horario}: ${itensTexto} - Total: R$${venda.total}`;
            listaVendasDia.appendChild(item);
        });
    }

    // Função para atualizar a lista de vendas do mês
    function atualizarListaVendasMes() {
        const dados = JSON.parse(localStorage.getItem('dados')) || {
            vendasDiarias: { vendasDiarias: [] }
        };
        listaVendasMes.innerHTML = ''; // Limpa a lista antes de adicionar novos itens

        dados.vendasDiarias.vendasDiarias.forEach(venda => {
            const item = document.createElement("li");
            item.textContent = `${venda.data} - ${venda.totalVendas} vendas`;
            listaVendasMes.appendChild(item);
        });
    }

    // Atualiza todas as listas quando a página carrega
    atualizarListaVendasOperador();
    atualizarListaVendasDia();
    atualizarListaVendasMes();

    document.querySelector(".logout").addEventListener("click", function() {
        window.location.href = "index.html";
    });

    document.querySelector(".estoque").addEventListener("click", function() {
        window.location.href = "estoque.html";
    });

    document.getElementById('iniciarOperacao').addEventListener('click', function () {
        const codigoOperador = document.getElementById("codigoOperador").value;
        const operador = dados.operacao.operadores.find(op => op.codigo === codigoOperador);

        if (operador) {
            localStorage.setItem("operadorAtual", operador.nome);
            window.location.href = 'caixa.html';
        } else {
            alert('Código de operador inválido.');
        }
    });

    fetchDados(); // Chama a função para buscar os dados
});