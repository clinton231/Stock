function inicio() {


    document.getElementById("formLogin").addEventListener("submit", formulario, false);
    document.getElementById("MostrarOcultarContraseña").addEventListener("click", MostrarOcultarContraseña, false);

    document.getElementById("formEmail").addEventListener("submit", formularioEmail, false);
}

function formulario(evento) {
    evento.preventDefault();
    if (validacionForm()) {
        document.getElementById("formLogin").submit();
    }
}

function validacionForm() {

    //Validacion Nombre
    let nombreInput = document.getElementById("idUsuarioNombre");
    let nombreArray = nombreInput.value.split(/ +/);
    let nombre = nombreInput.value;

    let smsErrorNombre = document.getElementById("errorUsuarioNombre");
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

    //Validacion Contraseña

    let passwordInput = document.getElementById("idUsuarioPassword");
    let password = passwordInput.value;

    let smsErrorPassword = document.getElementById("errorUsuarioPassword");
    let expresionRegularPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    passwordInput.classList.remove("is-invalid");
    passwordInput.classList.remove("is-valid");

    if (password.trim() === "") {
        passwordInput.classList.add("is-invalid");
        smsErrorPassword.innerHTML = "El campo Contraseña se encuentra vacío";
        return false;
    }

    if (!expresionRegularPassword.test(password)) {
        passwordInput.classList.add("is-invalid");
        smsErrorPassword.innerHTML = "La contraseña debe contener al menos 8 caracteres, una letra minúscula, una letra mayúscula y un dígito";
        return false;
    } else {
        passwordInput.classList.add("is-valid");
    }
    // Validacion Contraseña Fin

    return true;
}

function MostrarOcultarContraseña() {

    let inputContraseña = document.getElementById("idUsuarioPassword");

    let boton = document.getElementById("MostrarOcultarContraseña");

    if (boton.hasAttribute("boton")) {
        inputContraseña.type = "text";
        boton.removeAttribute("boton");
        boton.innerHTML = "";
        boton.innerHTML = "<i class='bi bi-eye-slash'></i>";
    } else {
        inputContraseña.type = "password";
        boton.setAttribute("boton", "MostrarOcultar")
        boton.innerHTML = "";
        boton.innerHTML = "<i class='bi bi-eye'></i>";
    }
}

function formularioEmail(evento) {
    evento.preventDefault();

    if (validarFormEmail()) {
        document.getElementById("formEmail").submit();
    }
}

function validarFormEmail() {
    //Validacion Email

    let emailInput = document.getElementById("idUsuarioEmail");
    let emailArray = emailInput.value.split(/ +/);
    let email = emailInput.value;

    emailInput.classList.remove("is-invalid");
    emailInput.classList.remove("is-valid");

    let smsErrorEmail = document.getElementById("errorUsuarioEmail");
    let expresionRegularEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email.trim() === "") {
        emailInput.classList.add("is-invalid");
        smsErrorEmail.innerHTML = "El campo Email se encuentra vacio";
        return false;
    }
    if (!expresionRegularEmail.test(email)) {
        emailInput.classList.add("is-invalid");
        smsErrorEmail.innerHTML = "El campo Email es invalido"
        return false;
    } else {
        emailInput.classList.add("is-valid");
    }

    if (emailArray.length > 1) {
        emailInput.classList.add("is-invalid");
        smsErrorEmail.innerHTML = "El campo Email solo acepta una palabra";
        return false;
    } else {
        emailInput.classList.add("is-valid");
    }

    for (palabra of emailArray) {
        if (palabra.length > 30) {
            emailInput.classList.add("is-invalid");
            smsErrorEmail.innerHTML = "El campo Apodo solo acepta como maximo 30 caracteres";
            return false;
        } else {
            emailInput.classList.add("is-valid");
        }
    }
    return true;

    //Validacion Email Fin
}

window.addEventListener("load", inicio, false);