function inicio() {
    document.getElementById("autocompletadoBuscarCliente").addEventListener("input", buscarCliente, false); 
    document.getElementById("listaProductos").addEventListener("click", seleccionarListaProducto, false);
}



let ProductoSeleccionado;


 



function buscarCliente() {

    const autocompletadoInput = document.getElementById("autocompletadoBuscarCliente");
    const inputTexto = autocompletadoInput.value.toLowerCase();

    const listaCliente = document.getElementById("listaProductos");

    if (inputTexto.trim() === "") {
        listaCliente.classList.add("d-none");
    }
    else {
        //comienza a buscar luego de las 2 coincidencias
        if (inputTexto.length>1) {
           
            listaCliente.classList.remove("d-none");
          
            TraerProductosdeDDBB(inputTexto);
                    
        }

    }
}

function mostrarListadoCliente(palabraFiltrada) {

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
            li.textContent = listado;
            li.addEventListener('click', () => {
                autocompletadoInput.value = listado;
                listaCliente.innerHTML = '';
            });
            listaCliente.appendChild(li);
        });
    }
}

function seleccionarListaProducto(){
    console.log("selcciono producto lista");
    const filaProductoPrecio=document.getElementById("idfilaPrecio");
   // const filaProductoCantidad=document.getElementById("idfilaCantidad");

   filaProductoPrecio.innerHTML=ProductoSeleccionado.PROD_PRECIO_VENTA;
    let cantidamax=ProductoSeleccionado.CANTIDAD;
    
    const filaProductoPrincipal = document.getElementById('idfilaProductoprincipal');
    
    filaProductoPrincipal.classList.remove("d-none")

    const filaCantidadinput = document.getElementById('idfilaCantidadinput');
    filaCantidadinput.setAttribute("max",cantidamax);
    // filaProductoCantidad.innerHTML=`<td class="col-1 text-center">                                                
    //                         <input type="number" class="form-control text-center" value="1" max="${cantidamax}" min="1">
    //                    </td>`;
}

function eliminarProductosTabla(){
    console.log("eliminos productos");
}


function agregarProductoTabla(){
    //id_Agregar_producto_Tabla   tablaCliente
    //console.log(document.getElementById("autocompletadoBuscarCliente").value.length );
    
    
    if (document.getElementById("autocompletadoBuscarCliente").value.length>=3) {
       // console.log("y paso");
       // console.log(document.getElementById("idcantidadinput").value);    
            //esto va evaluar mejor cuando se conecte ala base ya que trae datos de cantidad
        

            let tablaVenta= document.getElementById("tablaProductos");
            let marca=ProductoSeleccionado.MARCA;
            let nombre=ProductoSeleccionado.NOMBRE;
            let precio=ProductoSeleccionado.PROD_PRECIO_VENTA;
           // let cantida=keyword[posicionJson].cantidad;

            let filaCantidadInput=document.getElementById("idfilaCantidadinput").value;
           

            var row = tablaVenta.insertRow(-1).innerHTML =` <tr>
            <td class="ocultar-en-pantalla-xs ocultar-en-pantalla-sm ocultar-en-pantalla-md" scope="row">${cantidadDeFilas}</td>
            <td class="ocultar-en-pantalla-xs ocultar-en-pantalla-sm ocultar-en-pantalla-md text-center" scope="col">${marca}</td>
            <td class="text-center" scope="col">${nombre}</td>
            <td class="col-1 ocultar-en-pantalla-xs ocultar-en-pantalla-sm ocultar-en-pantalla-md text-center" scope="col">
            ${precio} $
            </td>
            <td class="col-1 ocultar-en-pantalla-xs ocultar-en-pantalla-sm ocultar-en-pantalla-md text-center"
             scope="col">                                                        
            ${filaCantidadInput}
             </td>

            <td  class="col-1 ocultar-en-pantalla-sm ocultar-en-pantalla-md text-center"scope="col">
            <button type="button" class="btn btn-danger btn-sm text-center"
                                 data-btn-grupo="eliminar-cliente"><i
                 class="bi bi-trash"></i></button>
            </td>
        </tr>`;      
        
        
        
    }
    document.getElementById("autocompletadoBuscarCliente").value="";

    
    document.getElementById("idfilaCantidadinput").value=1;
    const filaProductoPrincipal = document.getElementById('idfilaProductoprincipal');
    filaProductoPrincipal.classList.add("d-none")

 
   
}


function TraerProductosdeDDBB(inputTexto){
    let datasalida="",resultado="";
    fetch('../Controlador/MostrarProductos.php', {
        method: 'POST'
    })
    // .then(function(data){

      
    // for (var n in data) {
    //     console.log(n);
    // }
    //   console.log (data.json());
    // })
    .then((res)=>res.json())
    //.then((data)=>console.log(data));
    .then((data)=>{
        console.log(data);
        datasalida=JSON.parse(JSON.stringify(data));
        // let objson=JSON.stringify(data[0].categoria);
        // console.log(objson);
      
        // datasalida.forEach(element => {
        //    document.getElementById("idvuelto").innerHTML+=element.NOMBRE; 
        // });
        let templista=[];
        const AuxPalabraFiltrada = datasalida.filter( datasalida => templista.push(datasalida.NOMBRE)
                                                     , resultado=datasalida                             );
        const palabraFiltrada = templista.filter(templista => templista.toLowerCase().includes(inputTexto));
        mostrarListadoCliente(palabraFiltrada); 
        console.log("---"+resultado[0].PROD_PRECIO_VENTA);
        //ProductoSeleccionado=resultado[0];

        datasalida.forEach(element => {
         
            if (element.NOMBRE==palabraFiltrada) {
                ProductoSeleccionado=element;
                console.log("++"+element.NOMBRE)
            }
                
            
        });
        // for(var valor in objson){
        //   console.log(valor);  
        // }
        
        // console.log(data);
        // for (var valor in data[0].categoria) {
        //     CrearElementosSelecOption(valor);
        //     console.log(valor);
            
        // }
    });
    return resultado;
}

window.addEventListener("load", inicio, false);


    
