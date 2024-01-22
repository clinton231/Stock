function inicio() {

    URL = "../Controlador/SelectCategoriaIndicador.php";

    fetch(URL)
        .then(Response => {
            if (!Response.ok) {
                throw new Error("Error en la solicitud. Código de estado: " + Response.status);
            }
            return Response.json();
        })
        .then(data => {
            for (let categorias of data) {
                let op = document.createElement("option");
                let select = document.getElementById("selectCategoria");

                op.innerHTML = categorias.NOMBRE
                op.setAttribute("value", categorias.ID_CATEGORIA);
                select.appendChild(op);
            }
        })
        .catch(error => {
            console.error(error);
        })

}

window.addEventListener("load", inicio, false);