function inicio() {

    // "eliminar" cliente
    const botones_eliminar_cliente = document.querySelectorAll("[data-btn-grupo='eliminar-cliente']");
    for (let boton_eliminar_cliente of botones_eliminar_cliente) {
        boton_eliminar_cliente.addEventListener("click", eliminar_cliente);
    }

    // modificar datos de un cliente
    const botones_modificar_cliente_desde_tabla = document.querySelectorAll("[data-btn-grupo='modificar-cliente']");
    for (let boton_modificar_cliente_desde_tabla of botones_modificar_cliente_desde_tabla) {
        boton_modificar_cliente_desde_tabla.addEventListener("click", modificar_cliente_desde_tabla);
    }

    let boton_modificar_cliente_desde_formulario = document.getElementById("btnEditarFormulario");
    boton_modificar_cliente_desde_formulario.addEventListener("click", habilitar_modificacion_formulario);

    let boton_cancelar_edicion_formulario = document.getElementById("btnCancelarEdicioncliente");
    boton_cancelar_edicion_formulario.addEventListener("click", ocultar_formulario_modificar_cliente);

    let formulario_modificar_cliente = document.getElementById("frmModificarCliente");
    formulario_modificar_cliente.addEventListener("submit", modificar_cliente);

    // ver detalles de un cliente
    const botones_mostrar_detalles_cliente = document.querySelectorAll("[data-btn-grupo='mostrar-detalles-cliente']");
    for (let boton_mostrar_detalles_cliente of botones_mostrar_detalles_cliente) {
        boton_mostrar_detalles_cliente.addEventListener("click", mostrar_detalles_cliente);
    }
}


// eliminar clientes
function eliminar_cliente(evento) {
    // ocultando los datos del cliente seleccionado de la pantalla
    // (tener en cuenta a futuro) --> como no haremos borrado "fisico" de los datos en la BBDD, con ocultar los datos (sea de clientes, como de productos, combos, etc.) bastará
    let ocultar_cliente = evento.target.closest("tr");
    // ocultar_cliente.classList.add("ocultar");
    ocultar_cliente.remove();
}

// modificar cliente desde tabla
function modificar_cliente_desde_tabla(evento) {

    // ver formulario - inicio
    // empezando para mostrar los detalles del cliente seleccionado
    let boton_actual = evento.target;
    let fila_cliente = boton_actual.closest("tr");
    let cliente_id = fila_cliente.querySelector("td:nth-child(2)").textContent;
    let cliente_nombre = fila_cliente.querySelector("td:nth-child(3)").textContent;
    let cliente_apellido = fila_cliente.querySelector("td:nth-child(4)").textContent;
    let cliente_apodo = fila_cliente.querySelector("td:nth-child(5)").textContent;
    let cliente_email = fila_cliente.querySelector("td:nth-child(6)").textContent;

    // capturo los divs que encapsulan la barra de busqueda, tabla y formulario
    let div_mostrar_ocultar_barra_busqueda = document.getElementById("divOcultarMostrarBusqueda");
    let div_mostrar_ocultar_tabla = document.getElementById("divOcultarMostrarTablaClientes");
    let div_mostrar_ocultar_detalles_cliente = document.getElementById("divMostrarOcultarDetallesCliente");

    // ocultar barra de busqueda y tabla
    div_mostrar_ocultar_barra_busqueda.classList.add("d-none");
    div_mostrar_ocultar_tabla.classList.add("d-none");

    // mostrar forumlario
    div_mostrar_ocultar_detalles_cliente.classList.remove("d-none");

    // volcando los datos de un cliente al formulario
    let titulo_ver_detalle_cliente = document.getElementById("infoCliente");
    titulo_ver_detalle_cliente.innerHTML = "Información del cliente" + cliente_nombre;
    let formulario_cliente_id = document.getElementById("frmClienteID");
    let formulario_cliente_nombre = document.getElementById("frmClienteNombre");
    let formulario_cliente_apellido = document.getElementById("frmClienteApellido");
    let formulario_cliente_apodo = document.getElementById("frmClienteApodo");
    let formulario_cliente_email = document.getElementById("frmClienteEmail");

    formulario_cliente_id.value = cliente_id;
    formulario_cliente_id.setAttribute("disabled", "");

    formulario_cliente_nombre.value = cliente_nombre;
    formulario_cliente_nombre.setAttribute("disabled", "");

    formulario_cliente_apellido.value = cliente_apellido;
    formulario_cliente_apellido.setAttribute("disabled", "");

    formulario_cliente_apodo.value = cliente_apodo;
    formulario_cliente_apodo.setAttribute("disabled", "");

    formulario_cliente_email.value = cliente_email;
    formulario_cliente_email.setAttribute("disabled", "");
    // ver formulario - fin

    // habilito la modificacion
    if (habilitar_modificacion_formulario()) {

        modificar_cliente(); // llama a funcion "modificar_cliente()"
    }
}

// habilitar la modificacion del formulario
function habilitar_modificacion_formulario() {
    let titulo_ver_detalle_cliente = document.getElementById("infoCliente");

    let boton_editar_cliente = document.getElementById("btnEditarFormulario");

    let boton_guardar_cambios = document.getElementById("btnGuargarCambios");

    let formulario_cliente_id = document.getElementById("frmClienteID");

    let formulario_cliente_nombre = document.getElementById("frmClienteNombre");

    let formulario_cliente_apellido = document.getElementById("frmClienteApellido");

    let formulario_cliente_apodo = document.getElementById("frmClienteApodo");

    let formulario_cliente_email = document.getElementById("frmClienteEmail");

    //cambio el titulo del formulario
    titulo_ver_detalle_cliente.innerHTML = "Modificar datos del cliente " + formulario_cliente_nombre.value;

    // ocultar boton editar cliente
    boton_editar_cliente.classList.add("d-none");

    // mostrar boton guardar cambios
    boton_guardar_cambios.classList.remove("d-none");

    // quito el atributo "disabled" a los campos del formulario para poder editarlos
    formulario_cliente_id.removeAttribute("disabled");
    formulario_cliente_id.setAttribute("readonly", "");
    formulario_cliente_nombre.removeAttribute("disabled");
    formulario_cliente_apellido.removeAttribute("disabled");
    formulario_cliente_apodo.removeAttribute("disabled");
    formulario_cliente_email.removeAttribute("disabled");
}

// modificar datos de un cliente
function modificar_cliente(evento) {
    evento.preventDefault();

    let modal_titulo = document.getElementById("modalTitulo");
    let modal_texto = document.getElementById("modalTexto");
    modal_titulo.innerHTML = "";
    modal_texto.innerHTML = "";
    let array_cliente = validar_formulario_modificar_cliente();
    if (array_cliente) {
        // pendiente volcar los datos modificados a la tabla
        let formCliente = document.getElementById("frmModificarCliente");
        formCliente.submit();
        modal_titulo.innerHTML = "Modificación exitosa";
        modal_texto.innerHTML = "Los datos del cliente <b>" + array_cliente[0] + "</b> se han modificado correctamente.";
        mostrarModal();
        ocultar_formulario_modificar_cliente();
    } else {
        // errores en la validacion de formulario
    }
}

function validar_formulario_modificar_cliente() {
    let contador = 0;
    let array_salida = [];

    //Validacion Nombre
    let nombreInput = document.getElementById("frmClienteNombre");
    let nombreArray = nombreInput.value.split(/ +/);
    let nombre = nombreInput.value;

    let smsErrorNombre = document.getElementById("errorClienteNombre");
    let expresionRegularNombre = /^[a-zA-Z\s]+$/;

    nombreInput.classList.remove("is-invalid");
    nombreInput.classList.remove("is-valid");

    if (nombre.trim() === "") {
        nombreInput.classList.add("is-invalid");
        smsErrorNombre.innerHTML = "El campo Nombre se encuentra vacio";
        contador++;
    }
    if (!expresionRegularNombre.test(nombre)) {
        nombreInput.classList.add("is-invalid");
        smsErrorNombre.innerHTML = "El campo Nombre solo acepta caracteres alfabeticos"
        contador++;
    } else {
        nombreInput.classList.add("is-valid");
        array_salida.push(nombre);
    }

    if (nombreArray.length > 2) {
        nombreInput.classList.add("is-invalid");
        smsErrorNombre.innerHTML = "El campo nombre solo acepta uno o dos palabras";
        contador++;
    } else {
        nombreInput.classList.add("is-valid");
        array_salida.push(nombre);
    }

    for (let palabra of nombreArray) {
        if (palabra.length < 2 || palabra.length > 16) {
            nombreInput.classList.add("is-invalid");
            smsErrorNombre.innerHTML = "El campo Nombre solo acepta como minimo 2 caracteres y como maximo 16 por palabra";
            contador++;
        } else {
            nombreInput.classList.add("is-valid");
            array_salida.push(nombre);
        }
    }
    //Validacion Nombre Fin

    //Validacion Apellido
    let apellidoInput = document.getElementById("frmClienteApellido");
    let apellidoArray = apellidoInput.value.split(/ +/);
    let apellido = apellidoInput.value;

    apellidoInput.classList.remove("is-invalid");
    apellidoInput.classList.remove("is-valid");

    let smsErrorApellido = document.getElementById("errorClienteApellido");
    let expresionRegularApellido = /^[a-zA-Z\s]+$/;

    if (apellido.trim() === "") {
        apellidoInput.classList.add("is-invalid");
        smsErrorApellido.innerHTML = "El campo Apellido se encuentra vacio";
        contador++;
    }
    if (!expresionRegularApellido.test(apellido)) {
        apellidoInput.classList.add("is-invalid");
        smsErrorApellido.innerHTML = "El campo Apellido solo acepta caracteres alfabeticos"
        contador++;
    } else {
        apellidoInput.classList.add("is-valid");
        array_salida.push(apellido);
    }

    if (apellidoArray.length > 2) {
        apellidoInput.classList.add("is-invalid");
        smsErrorApellido.innerHTML = "El campo Apellido solo acepta una o dos palabra";
        contador++;
    } else {
        apellidoInput.classList.add("is-valid");
        array_salida.push(apellido);
    }

    for (palabra of apellidoArray) {
        if (palabra.length < 2 || palabra.length > 16) {
            apellidoInput.classList.add("is-invalid");
            smsErrorApellido.innerHTML = "El campo Nombre solo acepta como minimo 2 caracteres y como maximo 16 por palabra";
            contador++;
        } else {
            apellidoInput.classList.add("is-valid");
            array_salida.push(apellido);
        }
    }
    //Validacion Apellido Fin

    //Validacion Apodo
    let apodoInput = document.getElementById("frmClienteApodo");
    let apodoArray = apodoInput.value.split(/ +/);
    let apodo = apodoInput.value;

    apodoInput.classList.remove("is-invalid");
    apodoInput.classList.remove("is-valid");

    let smsErrorApodo = document.getElementById("errorClienteApodo");
    let expresionRegularApodo = /^[a-zA-Z\s]*$/;

    if (apodo.trim() === "") {
        apodoInput.classList.add("is-valid");
        // smsErrorApodo.innerHTML = "El campo Apodo se encuentra vacio";
        // contador++;
    }
    if (!expresionRegularApodo.test(apodo)) {
        apodoInput.classList.add("is-invalid");
        smsErrorApodo.innerHTML = "El campo Apodo solo acepta caracteres alfabeticos"
        contador++;
    } else {
        apodoInput.classList.add("is-valid");
        array_salida.push(apodo);
    }

    if (apodoArray.length > 2) {
        apodoInput.classList.add("is-invalid");
        smsErrorApodo.innerHTML = "El campo Apodo solo acepta dos palabra";
        contador++;
    } else {
        apodoInput.classList.add("is-valid");
        array_salida.push(apodo);
    }

    for (palabra of apodoArray) {
        if (palabra.length > 16) {
            apodoInput.classList.add("is-invalid");
            smsErrorApodo.innerHTML = "El campo Apodo solo acepta como maximo 16 caracteres";
            contador++;
        } else {
            apodoInput.classList.add("is-valid");
            array_salida.push(apodo);
        }
    }
    //Validacion Apodo Fin

    //Validacion Email
    let emailInput = document.getElementById("frmClienteEmail");
    let emailArray = emailInput.value.split(/ +/);
    let email = emailInput.value;

    emailInput.classList.remove("is-invalid");
    emailInput.classList.remove("is-valid");

    let smsErrorEmail = document.getElementById("errorClienteEmail");
    let expresionRegularEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email.trim() === "") {
        emailInput.classList.add("is-invalid");
        smsErrorEmail.innerHTML = "El campo Email se encuentra vacio";
        contador++;
    }
    if (!expresionRegularEmail.test(email)) {
        emailInput.classList.add("is-invalid");
        smsErrorEmail.innerHTML = "El campo Email es invalido"
        contador++;
    } else {
        emailInput.classList.add("is-valid");
        array_salida.push(email);
    }

    if (emailArray.length > 1) {
        emailInput.classList.add("is-invalid");
        smsErrorEmail.innerHTML = "El campo Email solo acepta una palabra";
        contador++;
    } else {
        emailInput.classList.add("is-valid");
        array_salida.push(email);
    }

    for (palabra of emailArray) {
        if (palabra.length > 30) {
            emailInput.classList.add("is-invalid");
            smsErrorEmail.innerHTML = "El campo Apodo solo acepta como maximo 30 caracteres";
            contador++;
        } else {
            emailInput.classList.add("is-valid");
            array_salida.push(email);
        }
    }
    //Validacion Email Fin

    // Validacion final
    if (contador == 1) {
        console.log("se encontró " + contador + " error.");
        return false;
    } else if (contador > 1) {
        console.log("se encontraron " + contador + " errores.");
        return false;
    } else {
        return array_salida;
    }
}

function ocultar_formulario_modificar_cliente() {

    // let div_formulario_cliente_apellido = document.getElementById("divFrmclienteRol");

    // let div_selector_rol = document.getElementById("divSelectorclienteRol");

    // let div_formulario_cliente_apodo = document.getElementById("divFrmclienteTipoDocumento");

    // let div_selector_tipo_documento = document.getElementById("divSelectorclienteTipoDocumento");

    let div_mostrar_ocultar_barra_busqueda = document.getElementById("divOcultarMostrarBusqueda");

    let div_mostrar_oultar_tabla = document.getElementById("divOcultarMostrarTablaClientes");

    let div_mostrar_ocultar_detalles_cliente = document.getElementById("divMostrarOcultarDetallesCliente");

    let formulario_modificar_datos_cliente = document.getElementById("frmModificarCliente");

    let boton_editar_cliente = document.getElementById("btnEditarFormulario");

    let boton_guardar_cambios = document.getElementById("btnGuargarCambios");

    div_mostrar_ocultar_detalles_cliente.classList.add("d-none");
    div_mostrar_ocultar_barra_busqueda.classList.remove("d-none");
    div_mostrar_oultar_tabla.classList.remove("d-none");
    // div_formulario_cliente_apellido.classList.remove("d-none");
    // div_selector_rol.classList.add("d-none");
    // div_formulario_cliente_apodo.classList.remove("d-none");
    // div_selector_tipo_documento.classList.add("d-none");
    boton_editar_cliente.classList.remove("d-none");
    boton_guardar_cambios.classList.add("d-none");
    formulario_modificar_datos_cliente.reset();
}


function mostrar_detalles_cliente(evento) {

    // empezando para mostrar los detalles del cliente seleccionado
    let boton_actual = evento.target;
    let fila_cliente = boton_actual.closest("tr");
    let cliente_id = fila_cliente.querySelector("td:nth-child(2)").textContent;
    let cliente_nombre = fila_cliente.querySelector("td:nth-child(3)").textContent;
    let cliente_apellido = fila_cliente.querySelector("td:nth-child(4)").textContent;
    let cliente_apodo = fila_cliente.querySelector("td:nth-child(5)").textContent;
    let cliente_email = fila_cliente.querySelector("td:nth-child(6)").textContent;

    // capturo los divs que encapsulan la barra de busqueda, tabla y formulario
    let div_mostrar_ocultar_barra_busqueda = document.getElementById("divOcultarMostrarBusqueda");
    let div_mostrar_ocultar_tabla = document.getElementById("divOcultarMostrarTablaClientes");
    let div_mostrar_ocultar_detalles_cliente = document.getElementById("divMostrarOcultarDetallesCliente");

    // ocultar barra de busqueda y tabla
    div_mostrar_ocultar_barra_busqueda.classList.add("d-none");
    div_mostrar_ocultar_tabla.classList.add("d-none");

    // mostrar forumlario
    div_mostrar_ocultar_detalles_cliente.classList.remove("d-none");

    // volcando los datos de un cliente al formulario
    let titulo_ver_detalle_cliente = document.getElementById("infoCliente");
    let formulario_cliente_id = document.getElementById("frmClienteID");
    let formulario_cliente_nombre = document.getElementById("frmClienteNombre");
    let formulario_cliente_apellido = document.getElementById("frmClienteApellido");
    let formulario_cliente_apodo = document.getElementById("frmClienteApodo");
    let formulario_cliente_email = document.getElementById("frmClienteEmail");

    titulo_ver_detalle_cliente.innerHTML = "Información del Cliente " + cliente_nombre;
    formulario_cliente_id.value = cliente_id;
    formulario_cliente_id.setAttribute("disabled", "");

    formulario_cliente_nombre.value = cliente_nombre;
    formulario_cliente_nombre.setAttribute("disabled", "");

    formulario_cliente_apellido.value = cliente_apellido;
    formulario_cliente_apellido.setAttribute("disabled", "");

    formulario_cliente_apodo.value = cliente_apodo;
    formulario_cliente_apodo.setAttribute("disabled", "");

    formulario_cliente_email.value = cliente_email;
    formulario_cliente_email.setAttribute("disabled", "");
}

// mostrar modal
function mostrarModal() {
    let modal_mensajes = new bootstrap.Modal(document.getElementById("modalMostrarMensajes"));
    modal_mensajes.show();
}

window.addEventListener("load", inicio, false);