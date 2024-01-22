function inicio() {
    document.getElementById("configForm").addEventListener("submit", enviarConfiguracionPorAjax, false);
}

function enviarConfiguracionPorAjax(evento) {
    evento.preventDefault();

    if (validarForm()) {
        // Obtengo los datos del formulario
        let configForm = new FormData(document.getElementById("configForm"));

        // Realizo la solicitud AJAX
        let solicitud = new XMLHttpRequest();

        solicitud.open("POST", "../Controlador/InsertIndicador.php", true);

        solicitud.onload = function() {
            if (solicitud.status === 200) {
                setTimeout(valid, 3000);
                let formValid = document.getElementById("errorIndicadorValid");
                formValid.innerHTML = "Solicitud enviada";
                formValid.classList.remove("d-none");
            } else {
                setTimeout(invalid, 3000);
                let formInvalid = document.getElementById("errorIndicadorInvalid");
                formInvalid.innerHTML = "Error en la solicitud Ajax";
                formInvalid.classList.remove("d-none");
            }
        }

        // Envio los datos del formulario
        solicitud.send(configForm);
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

    //Validacion Limite de Dia
    let limiteDiaInput = document.getElementById("limiteDeDia");
    let limiteDeDia = limiteDiaInput.value;

    limiteDiaInput.classList.remove("is-valid");
    limiteDiaInput.classList.remove("is-invalid");

    let smsIndicadorDia = document.getElementById("errorIndicadorDia");
    let expresionRegularDia = /^\d+$/;

    if (limiteDeDia.trim() === "") {
        smsIndicadorDia.innerHTML = "El Campo Dia se encentra vacio";

        limiteDiaInput.classList.add("is-invalid");
        return false;
    } else {
        limiteDiaInput.classList.add("is-valid");
    }

    if (!expresionRegularDia.test(limiteDeDia)) {
        smsIndicadorDia.innerHTML = "El Campo Limite solo acepta caracteres numericos"

        limiteDiaInput.classList.add("is-invalid");
        return false;
    } else {
        limiteDiaInput.classList.add("is-valid");
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