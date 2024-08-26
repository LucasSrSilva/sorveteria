document.addEventListener("DOMContentLoaded", function () {

    document.getElementById('iniciarOperacao').addEventListener('click', function () {
        const codigoOperador = document.getElementById("codigoOperador").value;

        fetch('../database/operadores.json')
            .then(response => response.json())
            .then(data => {
                const operador = data.operadores.find(op => op.codigo === codigoOperador);
                if (operador) {
                    window.location.href = 'caixa.html';
                } else {
                    alert('Código de operador inválido.');
                }
            })
            .catch(error => console.error('Erro ao carregar o JSON de operadores:', error));

    });
    
    fetch('../database/vendas.json')
        .then(response => response.json())
        .then(data => {
            const listaVendasDia = document.getElementById("lista-vendas-dia");
            data.vendas.forEach(venda => {
                const item = document.createElement("li");
                item.textContent = `${venda.horario}: ${venda.itens} - Total: R$${venda.total}`;
                listaVendasDia.appendChild(item);
            });
        })
        .catch(error => {
            console.error("Erro ao carregar os dados do JSON:", error);
        });

    // Carregar vendas mensais
    fetch('../database/vendasDiarias.json')
        .then(response => response.json())
        .then(data => {
            const listaVendasMes = document.getElementById("lista-vendas-mes");
            data.vendasDiarias.forEach(venda => {
                const item = document.createElement("li");
                item.textContent = `${venda.data} - ${venda.totalVendas} vendas`;
                listaVendasMes.appendChild(item);
            });
        })
        .catch(error => {
            console.error("Erro ao carregar os dados do JSON:", error);
        });

    // Carregar total de vendas por operador no mês
    fetch('../database/vendasOperador.json')
        .then(response => response.json())
        .then(data => {
            const listaVendasOperador = document.getElementById("lista-vendas-operador");
            data.vendasOperadores.forEach(venda => {
                const item = document.createElement("li");
                item.textContent = `${venda.mes}: ${venda.operador} - ${venda.totalVendas} vendas`;
                listaVendasOperador.appendChild(item);
            });
        })
        .catch(error => {
            console.error("Erro ao carregar os dados do JSON:", error);
        });
})