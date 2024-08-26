import { gerencia } from "./dados.js";

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const codigoInserido = document.getElementById("codigo").value;

        

        if (codigoInserido === gerencia.gerentes.codigo) {
            window.location.href = "gerencia.html"
        } else {
            alert("Código incorreto, tente novamente.")
        }
    });
});