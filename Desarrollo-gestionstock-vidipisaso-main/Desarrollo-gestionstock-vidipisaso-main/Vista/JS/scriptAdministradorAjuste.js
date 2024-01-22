function inicio() {
    document.getElementById("autocompletadoBuscarCliente").addEventListener("input", buscarCliente, false);
    document.getElementById("id_Agregar_producto_Tabla").addEventListener("click", agregarProductoTabla, false);
    document.getElementById("id_Eliminar_producto_Tabla").addEventListener("click", eliminarProductosTabla, false);
    document.getElementById("listaProductos").addEventListener("click", seleccionarListaProducto, false);
    document.getElementById("idvenderboton").addEventListener("click", e=>{venderProductos(e)},false);
}

const posicionJson=0;
let cantidadDeFilas=1, subTotal=0;
let ProductoSeleccionado;
localStorage.setItem("cantidadDeFilas", cantidadDeFilas);
localStorage.setItem("subTotal", subTotal);


function buscarCliente() {

    const autocompletadoInput = document.getElementById("autocompletadoBuscarCliente");
    const inputTexto = autocompletadoInput.value.toLowerCase();

    const listaCliente = document.getElementById("listaProductos");

    if (inputTexto.trim() === "") {
        listaCliente.classList.add("d-none");
    }
    else {
        //comienza a buscar luego de las 2 coincidencias
        if (inputTexto.length>2) {

            listaCliente.classList.remove("d-none");

            TraerProductosdeDDBB(inputTexto);
       
        }

    }
}



function mostrarListadoCliente(palabraFiltrada,objetoProductoSeleccionado) {

    const autocompletadoInput = document.getElementById("autocompletadoBuscarCliente");

    const listaCliente = document.getElementById("listaProductos");

    const smsErrorResultado = document.getElementById('smsResultado');

    listaCliente.innerHTML = '';

    if (palabraFiltrada.length === 0) {
        smsErrorResultado.classList.remove("d-none")
    } else {
        smsErrorResultado.classList.add("d-none")

        palabraFiltrada.forEach(listado => {
            const li = document.createElement('li');
            li.textContent = listado+" "+objetoProductoSeleccionado.MARCA+" "+
            objetoProductoSeleccionado.PROD_PRECIO_VENTA+"$";
            li.addEventListener('click', () => {
                autocompletadoInput.value = listado;
                listaCliente.innerHTML = '';
            });
            listaCliente.appendChild(li);
        });
    }
}




function TraerProductosdeDDBB(inputTexto){
    let datasalida="",resultado="";
    fetch('../Controlador/MostrarProductos.php', {
        method: 'POST'
    })
   
    .then((res)=>res.json())

    .then((data)=>{
        console.log(data);
        datasalida=JSON.parse(JSON.stringify(data));
       
        let templista=[];
        const AuxPalabraFiltrada = datasalida.filter( datasalida => templista.push(datasalida.NOMBRE)
                                                     , resultado=datasalida                             );
        const palabraFiltrada = templista.filter(templista => templista.toLowerCase().includes(inputTexto));
        
        console.log("---"+resultado[0].PROD_PRECIO_VENTA);
        //ProductoSeleccionado=resultado[0];

        datasalida.forEach(element => {
         
            if (element.NOMBRE==palabraFiltrada) {
                ProductoSeleccionado=element;
                console.log("++"+element.NOMBRE)
            }
                
            
        });
        
        mostrarListadoCliente(palabraFiltrada,ProductoSeleccionado); 

        
    });
    return resultado;
}

window.addEventListener("load", inicio, false);