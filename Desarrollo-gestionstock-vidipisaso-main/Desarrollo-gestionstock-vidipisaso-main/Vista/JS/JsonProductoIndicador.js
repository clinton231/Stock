function inicio() {

    URL = "../Controlador/SelectProductoIndicador.php";

    fetch(URL)
        .then(Response => {
            if (!Response.ok) {
                throw new Error("Error en la solicitud. Código de estado: " + Response.status);
            }
            return Response.json();
        })
        .then(data => {
            for (let productos of data) {
                let op = document.createElement("option");
                let select = document.getElementById("selectProducto");

                op.innerHTML = productos.NOMBRE
                op.setAttribute("value", productos.ID_PRODUCTO);
                select.appendChild(op);
            }
        })
        .catch(error => {
            console.error(error);
        })

}

window.addEventListener("load", inicio, false);