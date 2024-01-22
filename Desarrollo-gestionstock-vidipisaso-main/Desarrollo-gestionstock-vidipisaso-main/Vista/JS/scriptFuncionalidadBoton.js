function inicio() {

    //Boton submit
    document.getElementById("frmModificarCliente").addEventListener("submit", Formulario, false);

    //Boton Detalle
    let botonMostrarDetalle = document.querySelectorAll("button[data-btn-grupo='mostrar-detalles-cliente']");
    for (let botones of botonMostrarDetalle) {
        botones.addEventListener("click", mostrarDetalle, false);
    }

    //Boton Editar
    let botonEditar = document.querySelectorAll("button[data-btn-grupo='modificar-cliente']");
    for (let botones of botonEditar) {
        botones.addEventListener("click", EditarCliente, false);
    }
}

function Formulario(evento) {
    evento.preventDefault();
    if (ValidarEditarFormulario()) {
        mostrarModal();
        setTimeout(enviarFormulario, 1000);
    }
}

function enviarFormulario() {
    document.getElementById("frmModificarCliente").submit();
}

function mostrarDetalle(evento) {
    const modalDetalleCliente = new bootstrap.Modal(document.getElementById('modalDetalleCliente'), );
    modalDetalleCliente.show();

    let botonActual = evento.target;

    let filaCliente = botonActual.closest("tr"); //Closest encuentra el elemento más cercano que coincida con el selector

    let clienteID = filaCliente.querySelector("td:nth-child(2)").textContent;
    let vendedorID = filaCliente.querySelector("td:nth-child(3)").textContent;
    let clienteNombre = filaCliente.querySelector("td:nth-child(4)").textContent;
    let clienteApellido = filaCliente.querySelector("td:nth-child(5)").textContent;
    let clienteApodo = filaCliente.querySelector("td:nth-child(6)").textContent;
    let clienteFechaAlta = filaCliente.querySelector("td:nth-child(7)").textContent;
    let clienteFechaBaja = filaCliente.querySelector("td:nth-child(8)").textContent;

    // volcando los datos de un cliente al formulario del modal
    let tituloDetalleCliente = document.getElementById("infoCliente");
    let formularioClienteID = document.getElementById("frmClienteID");
    let formularioClienteIDVendedor = document.getElementById("frmClienteIDUsuarioRegistrado");
    let formularioClienteNombre = document.getElementById("frmClienteNombre");
    let formularioClienteApellido = document.getElementById("frmClienteApellido");
    let formularioClienteApodo = document.getElementById("frmClienteApodo");
    let formularioClienteFechaAlta = document.getElementById("frmClienteFechaAlta");
    let formularioClienteFechaBaja = document.getElementById("frmClienteFechaBaja");

    tituloDetalleCliente.innerHTML = "Informacion del cliente:" + clienteNombre;
    formularioClienteID.value = clienteID;
    formularioClienteIDVendedor.value = vendedorID;
    formularioClienteNombre.value = clienteNombre;
    formularioClienteApellido.value = clienteApellido;
    formularioClienteApodo.value = clienteApodo;
    formularioClienteFechaAlta.value = clienteFechaAlta;
    formularioClienteFechaBaja.value = clienteFechaBaja;
}

function EditarCliente(evento) {
    const modalEditarCliente = new bootstrap.Modal(document.getElementById('modalEditarCliente'), );
    modalEditarCliente.show();

    let botonActual = evento.target;

    let filaCliente = botonActual.closest("tr"); //Closest encuentra el elemento más cercano que coincida con el selector

    let clienteID = filaCliente.querySelector("td:nth-child(2)").textContent;
    let clienteNombre = filaCliente.querySelector("td:nth-child(4)").textContent;
    let clienteApellido = filaCliente.querySelector("td:nth-child(5)").textContent;
    let clienteApodo = filaCliente.querySelector("td:nth-child(6)").textContent;
    let clienteEstado = filaCliente.querySelector("td:nth-child(9)").textContent;

    console.log(clienteNombre);

    // volcando los datos de un cliente al formulario del modal
    let tituloDetalleCliente = document.getElementById("infoEditarCliente");
    let formularioClienteID = document.getElementById("frmEditarClienteID");
    let fomularioClientNombre = document.getElementById("frmEditarClienteNombre");
    let formularioClienteApellido = document.getElementById("frmEditarClienteApellido");
    let formularioClienteApodo = document.getElementById("frmEditarClienteApodo");
    let formularioClienteEstado = document.getElementById("frmEditarClienteEstado");

    tituloDetalleCliente.innerHTML = "Informacion del cliente:" + clienteNombre;
    formularioClienteID.value = clienteID;
    fomularioClientNombre.value = clienteNombre;
    formularioClienteApellido.value = clienteApellido;
    formularioClienteApodo.value = clienteApodo;
    formularioClienteEstado.value = clienteEstado;
}

function ValidarEditarFormulario() {

    //Validacion Nombre
    let nombreInput = document.getElementById("frmEditarClienteNombre");
    let nombreArray = nombreInput.value.split(/ +/);
    let nombre = nombreInput.value;

    let smsErrorNombre = document.getElementById("errorEditarClienteNombre");
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
    let apellidoInput = document.getElementById("frmEditarClienteApellido");
    let apellidoArray = apellidoInput.value.split(/ +/);
    let apellido = apellidoInput.value;

    apellidoInput.classList.remove("is-invalid");
    apellidoInput.classList.remove("is-valid");

    let smsErrorApellido = document.getElementById("errorEditarClienteApellido");
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
        return false
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
    let apodoInput = document.getElementById("frmEditarClienteApodo");
    let apodoArray = apodoInput.value.split(/ +/);
    let apodo = apodoInput.value;

    apodoInput.classList.remove("is-invalid");
    apodoInput.classList.remove("is-valid");

    let smsErrorApodo = document.getElementById("errorEditarClienteApodo");
    let expresionRegularApodo = /^[a-zA-Z\s]*$/;

    if (apodo.trim() === "") {
        apodoInput.classList.add("is-valid");
        // smsErrorApodo.innerHTML = "El campo Apodo se encuentra vacio";
        // 
    }
    if (!expresionRegularApodo.test(apodo)) {
        apodoInput.classList.add("is-invalid");
        smsErrorApodo.innerHTML = "El campo Apodo solo acepta caracteres alfabeticos"
        return false;
    } else {
        apodoInput.classList.add("is-valid");
    }

    if (apodoArray.length > 2) {
        apodoInput.classList.add("is-invalid");
        smsErrorApodo.innerHTML = "El campo Apodo solo acepta uno o dos palabra";
        return false;
    } else {
        apodoInput.classList.add("is-valid");
    }

    for (palabra of apodoArray) {
        if (palabra.length > 16) {
            apodoInput.classList.add("is-invalid");
            smsErrorApodo.innerHTML = "El campo Apodo solo acepta como maximo 16 caracteres";
            return false;
        } else {
            apodoInput.classList.add("is-valid");
        }
    }
    //Validacion Apodo Fin
    return true;
}

function mostrarModal() {
    swal({
        title: "Cliente Modificado",
        icon: "success",
        button: "Cerrar",
    });
}


window.addEventListener("load", inicio, false);