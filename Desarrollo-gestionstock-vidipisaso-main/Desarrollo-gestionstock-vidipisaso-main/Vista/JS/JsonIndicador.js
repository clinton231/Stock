function inicio() {
    document.getElementById("configForm").addEventListener("submit", enviarConfiguracionPorAjax, false);
}

function enviarConfiguracionPorAjax(evento) {
    evento.preventDefault();

    if (validarForm()) {
        // Obtengo los datos del formulario
        let configForm = new FormData(document.getElementById("configForm"));

        // Realizo la solicitud Fetch
        fetch("../Controlador/InsertIndicador.php", {
                method: "POST",
                body: configForm,
            })
            .then(response => {
                if (response.ok) {
                    setTimeout(valid, 2000);
                    let formValid = document.getElementById("errorIndicadorValid");
                    formValid.innerHTML = "Solicitud enviada";
                    formValid.classList.remove("d-none");
                } else {
                    setTimeout(invalid, 2000);
                    let formInvalid = document.getElementById("errorIndicadorInvalid");
                    formInvalid.innerHTML = "Error en la solicitud Fetch";
                    formInvalid.classList.remove("d-none");
                }
            })
            .catch(error => {
                setTimeout(invalid, 3000);
                let formInvalid = document.getElementById("errorIndicadorInvalid");
                formInvalid.innerHTML = "Error en la solicitud Fetch: " + error.message;
                formInvalid.classList.remove("d-none");
            });
    }
}

function validarForm() {

    //Validacion Limite de Aviso
    let limiteAvisoInput = document.getElementById("limiteDeAviso");
    let limiteDeAviso = limiteAvisoInput.value;

    limiteAvisoInput.classList.remove("is-valid");
    limiteAvisoInput.classList.remove("is-invalid");

    let smsIndicadorAviso = document.getElementById("errorIndicadorAviso");
    let expresionRegularAviso = /^\d+$/;

    if (limiteDeAviso.trim() === "") {
        smsIndicadorAviso.innerHTML = "El Campo Limite se encentra vacio";

        limiteAvisoInput.classList.add("is-invalid");
        return false;
    } else {
        limiteAvisoInput.classList.add("is-valid");
    }

    if (!expresionRegularAviso.test(limiteDeAviso)) {
        smsIndicadorAviso.innerHTML = "El Campo Limite solo acepta caracteres numericos"
        limiteAvisoInput.classList.add("is-invalid");
        return false;
    } else {
        limiteAvisoInput.classList.add("is-valid");
    }

    return true;
}

function valid() {
    let formValid = document.getElementById("errorIndicadorValid");
    formValid.classList.add("d-none")
    document.getElementById("configForm").reset();
}

function invalid() {
    let formValid = document.getElementById("errorIndicadorInvalid");
    formValid.classList.add("d-none")
    document.getElementById("configForm").reset();
}

window.addEventListener("load", inicio, false);