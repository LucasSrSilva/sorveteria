document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        const codigoInserido = document.getElementById("codigo").value;

        fetch('../database/gerentes.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao carregar o arquivo JSON');
                }
                return response.json();
            })
            .then(data => {
                const gerente = data.gerentes; // Acessa o objeto único de gerente

                if (gerente.codigo === codigoInserido) {
                    // Redireciona para a página gerência.html
                    window.location.href = 'gerencia.html';
                } else {
                    alert("Código inválido. Tente novamente.");
                }
            })
            .catch(error => {
                console.error("Erro ao carregar os dados do JSON:", error);
            });
    });
});