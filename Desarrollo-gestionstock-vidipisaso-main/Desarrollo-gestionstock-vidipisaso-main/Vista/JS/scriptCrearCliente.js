function inicio() {
    document.getElementById("frmNuevoCliente").addEventListener("submit", altaCliente, false);
    document.getElementById("btnCancelarNuevoCliente").addEventListener("click", cancelarAlta, false);
}

function altaCliente(e) {
    e.preventDefault();
    if (validarForm()) {
        let form = document.getElementById("frmNuevoCliente");
        form.submit();
        comprobarExito();
    }
}

function validarForm() {
    //Validacion Nombre
    let nombreInput = document.getElementById("frmNuevoClienteNombre");
    let nombreArray = nombreInput.value.split(/ +/);
    let nombre = nombreInput.value;

    let smsErrorNombre = document.getElementById("errorNuevoClienteNombre");
    let expresionRegularNombre = /^[a-zA-Z\s]+$/;

    nombreInput.classList.remove("is-invalid");
    nombreInput.classList.remove("is-valid");

    if (nombre.trim() === "") {
        nombreInput.classList.add("is-invalid");
        smsErrorNombre.innerHTML = "El campo Nombre se encuentra vacio";
        return false;
    }
    if (!expresionRegularNombre.test(nombre)) {
        nombreInput.classList.add("is-invalid");
        smsErrorNombre.innerHTML = "El campo Nombre solo acepta caracteres alfabeticos"
        return false;
    } else {
        nombreInput.classList.add("is-valid");
    }

    if (nombreArray.length > 2) {
        nombreInput.classList.add("is-invalid");
        smsErrorNombre.innerHTML = "El campo nombre solo acepta uno o dos palabras";
        return false;
    } else {
        nombreInput.classList.add("is-valid");
    }

    for (let palabra of nombreArray) {
        if (palabra.length < 2 || palabra.length > 16) {
            nombreInput.classList.add("is-invalid");
            smsErrorNombre.innerHTML = "El campo Nombre solo acepta como minimo 2 caracteres y como maximo 16 por palabra";
            return false;
        } else {
            nombreInput.classList.add("is-valid");
        }
    }
    //Validacion Nombre Fin

    //Validacion Apellido
    let apellidoInput = document.getElementById("frmNuevoClienteApellido");
    let apellidoArray = apellidoInput.value.split(/ +/);
    let apellido = apellidoInput.value;

    apellidoInput.classList.remove("is-invalid");
    apellidoInput.classList.remove("is-valid");

    let smsErrorApellido = document.getElementById("errorNuevoClienteApellido");
    let expresionRegularApellido = /^[a-zA-Z\s]+$/;

    if (apellido.trim() === "") {
        apellidoInput.classList.add("is-invalid");
        smsErrorApellido.innerHTML = "El campo Apellido se encuentra vacio";
        return false;
    }
    if (!expresionRegularApellido.test(apellido)) {
        apellidoInput.classList.add("is-invalid");
        smsErrorApellido.innerHTML = "El campo Apellido solo acepta caracteres alfabeticos"
        return false;
    } else {
        apellidoInput.classList.add("is-valid");
    }

    if (apellidoArray.length > 2) {
        apellidoInput.classList.add("is-invalid");
        smsErrorApellido.innerHTML = "El campo Apellido solo acepta una o dos palabra";
        return false;
    } else {
        apellidoInput.classList.add("is-valid");
    }

    for (palabra of apellidoArray) {
        if (palabra.length < 2 || palabra.length > 16) {
            apellidoInput.classList.add("is-invalid");
            smsErrorApellido.innerHTML = "El campo Nombre solo acepta como minimo 2 caracteres y como maximo 16 por palabra";
            return false;
        } else {
            apellidoInput.classList.add("is-valid");
        }
    }
    //Validacion Apellido Fin

    //Validacion Apodo
    let apodoInput = document.getElementById("frmNuevoClienteApodo");
    let apodoArray = apodoInput.value.split(/ +/);
    let apodo = apodoInput.value;

    apodoInput.classList.remove("is-invalid");
    apodoInput.classList.remove("is-valid");

    let smsErrorApodo = document.getElementById("errorNuevoClienteApodo");
    let expresionRegularApodo = /^[a-zA-Z\s]*$/;

    if (!expresionRegularApodo.test(apodo)) {
        apodoInput.classList.add("is-invalid");
        smsErrorApodo.innerHTML = "El campo Apodo solo acepta caracteres alfabeticos"
        return false;
    } else {
        apodoInput.classList.add("is-valid");
    }

    if (apodoArray.length > 2) {
        apodoInput.classList.add("is-invalid");
        smsErrorApodo.innerHTML = "El campo Apodo solo acepta una o dos palabra";
        return false;
    } else {
        apodoInput.classList.add("is-valid");
    }

    for (palabra of apodoArray) {
        if (palabra.length > 16) {
            apodoInput.classList.add("is-invalid");
            smsErrorApodo.innerHTML = "El campo Apodo solo acepta como minimo 2 caracteres y como maximo 16";
            return false;
        } else {
            apodoInput.classList.add("is-valid");
        }
    }
    //Validacion Apodo Fin

    //Validacion Email

    // let emailInput = document.getElementById("frmNuevoClienteEmail");
    // let emailArray = emailInput.value.split(/ +/);
    // let email = emailInput.value;

    // emailInput.classList.remove("is-invalid");
    // emailInput.classList.remove("is-valid");

    // let smsErrorEmail = document.getElementById("errorNuevoClienteEmail");
    // let expresionRegularEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // if (email.trim() === "") {
    //     emailInput.classList.add("is-invalid");
    //     smsErrorEmail.innerHTML = "El campo Email se encuentra vacio";
    //     return false;
    // }
    // if (!expresionRegularEmail.test(email)) {
    //     emailInput.classList.add("is-invalid");
    //     smsErrorEmail.innerHTML = "El campo Email es invalido"
    //     return false;
    // } else {
    //     emailInput.classList.add("is-valid");
    // }

    // if (emailArray.length > 1) {
    //     emailInput.classList.add("is-invalid");
    //     smsErrorEmail.innerHTML = "El campo Email solo acepta una palabra";
    //     return false;
    // } else {
    //     emailInput.classList.add("is-valid");
    // }

    //     for (palabra of emailArray) {
    //         if (palabra.length > 30) {
    //             emailInput.classList.add("is-invalid");
    //             smsErrorEmail.innerHTML = "El campo Apodo solo acepta como maximo 30 caracteres";
    //             return false;
    //         } else {
    //             emailInput.classList.add("is-valid");
    //         }
    //     }
    //Validacion Email Fin
    return true;
}

//Modal
function mostrarModal() {
    let exampleModal = new bootstrap.Modal(document.getElementById('modalMostrarMensajes'));
    exampleModal.show();
    let textoModal = document.getElementById("modalTexto");
    textoModal.innerHTML = "Registrado y guardado exitoso"
    let formularioAgregarCliente = document.getElementById("frmNuevoCliente");
    formularioAgregarCliente.reset();

    let nombreInput = document.getElementById("frmNuevoClienteNombre");
    nombreInput.classList.remove("is-valid");
    let apellidoInput = document.getElementById("frmNuevoClienteApellido");
    apellidoInput.classList.remove("is-valid");
    let apodoInput = document.getElementById("frmNuevoClienteApodo");
    apodoInput.classList.remove("is-valid");
    let emailInput = document.getElementById("frmNuevoClienteEmail");
    emailInput.classList.remove("is-valid");
}

//Comprobar modal
function comprobarExito() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('exito')) {
        mostrarModal();
    }
}

function cancelarAlta() {
    let formularioAgregarCliente = document.getElementById("frmNuevoCliente");
    formularioAgregarCliente.reset();

    let nombreInput = document.getElementById("frmNuevoClienteNombre");
    nombreInput.classList.remove("is-valid");
    nombreInput.classList.remove("is-invalid");
    let apellidoInput = document.getElementById("frmNuevoClienteApellido");
    apellidoInput.classList.remove("is-valid");
    apellidoInput.classList.remove("is-invalid");
    let apodoInput = document.getElementById("frmNuevoClienteApodo");
    apodoInput.classList.remove("is-valid");
    apodoInput.classList.remove("is-invalid");
    // let emailInput = document.getElementById("frmNuevoClienteEmail");
    // emailInput.classList.remove("is-valid");
    // emailInput.classList.remove("is-invalid");
    window.location.href = "VendedorListaCliente.php";
}

window.addEventListener("load", inicio, false);