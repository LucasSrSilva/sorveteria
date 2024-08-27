document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const codigoInserido = document.getElementById("codigo").value;

        // Função para buscar os dados do JSON
        async function verificarLogin() {
            try {
                const response = await fetch('docs/dados.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                // Verificar o código inserido
                const codigoGerente = data.gerencia.gerentes.codigo;
                if (codigoInserido === codigoGerente) {
                    window.location.href = "gerencia.html";
                } else {
                    alert("Código incorreto, tente novamente.");
                }
            } catch (error) {
                console.error('Houve um problema com a requisição fetch:', error);
            }
        }

        verificarLogin(); // Chama a função para verificar o login
    });
});