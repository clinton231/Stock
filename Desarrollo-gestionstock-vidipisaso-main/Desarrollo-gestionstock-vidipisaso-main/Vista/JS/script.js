const Hardusuario = "user";
const Hardpassword = "123"

const HardAdminUser="admin";
const HardAdminPass="123";
const tocar_boton = document.getElementById("idbotonlogIn");



//login
tocar_boton.addEventListener("click", e => {
    const usuario = document.getElementById("idNombreDeUsuario").value;
    const password = document.getElementById("idpassword").value;

    if (usuario === Hardusuario && password === Hardpassword) {
        console.log(usuario + " " + password);
        location.href = "VendedorVender.html";
        //document.getElementById("idContenedor").innerHTML = pantalla_principal_vendedor;
    
    }else if (usuario === HardAdminUser && password === HardAdminPass) {

        location.href = "Administrador.html";
        //document.getElementById("idContenedor").innerHTML = pantalla_principal_administrador;
        
    } else {

        document.getElementById("idalerta").innerHTML = "<p>Error</p>";
    }

});


//obtener productos en pantalla venta

// Lista de productos (ejemplo)
let productos = [
    { id: 1,  marca: "Milka",nombre:"Alfajor Triple Milka Oreo 61g", precio: 220 },
    { id: 2,  marca: "Louis Vuitton",nombre:"Alfajores Milka Mousse Simple 42g", precio: 230 },
    { id: 3,  marca: "Lays",nombre:"Papas fritas Lays clásica 379 g",  precio: 2050 }
    
];

