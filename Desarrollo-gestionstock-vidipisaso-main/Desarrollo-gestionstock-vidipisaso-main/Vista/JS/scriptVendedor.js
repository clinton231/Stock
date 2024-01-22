function inicio() {
    document.getElementById("autocompletadoBuscarCliente").addEventListener("input", buscarCliente, false);
    document.getElementById("id_Agregar_producto_Tabla").addEventListener("click", agregarProductoTabla, false);
    document.getElementById("id_Eliminar_producto_Tabla_cancelar").addEventListener("click", eliminarProductosTabla, false);
    document.getElementById("listaProductos").addEventListener("click", seleccionarListaProducto, false);
    document.getElementById("idvenderboton").addEventListener("click", e=>{venderProductos(e)},false);

}
//json de para generar el resumen de toda la venta para enviar ala base
let jsonEnvio=[
        //{id:0,marca:"Milka",nombre:"Alfajor Triple Milka Oreo 61g",precio:300,cantidad:200},

    ];  







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

function seleccionarListaProducto(){
    //console.log("selcciono producto lista");
    const filaProductoPrecio=document.getElementById("idfilaPrecio");
   // const filaProductoCantidad=document.getElementById("idfilaCantidad");

   filaProductoPrecio.innerHTML=ProductoSeleccionado.PROD_PRECIO_VENTA+" $";
    let cantidamax=ProductoSeleccionado.CANTIDAD;
    
    const filaProductoPrincipal = document.getElementById('idfilaProductoprincipal');
    
    filaProductoPrincipal.classList.remove("d-none")

    const filaCantidadinput = document.getElementById('idfilaCantidadinput');
    filaCantidadinput.setAttribute("max",cantidamax);

}

function eliminarProductosTabla(){
    console.log("eliminos productos");
    document.getElementById("tablaProductos").innerHTML="";
    let filaProductoPrincipal=document.getElementById("idfilaProductoprincipal");
    filaProductoPrincipal.classList.add("d-none");
    document.getElementById("autocompletadoBuscarCliente").value="";
    document.getElementById("idtotal").innerHTML="0 $"
    jsonEnvio=[];
    localStorage.setItem("subTotal",0);
    subTotal=0;
    cantidadDeFilas=1
    localStorage.setItem("cantidadDeFilas",1);
}

function venderProductos(e) {
    e.preventDefault();
    console.log("vendio productos");

    document.getElementById("idinputdatosTxt").value=JSON.stringify(jsonEnvio);
    console.log("mando esto+"+document.getElementById("idinputdatosTxt").value);
    GuardarVenta();
}


function agregarProductoTabla(){
   
    
    
    if (document.getElementById("autocompletadoBuscarCliente").value.length>=3) {
    
        

            let tablaVenta= document.getElementById("tablaProductos");
            let marca=ProductoSeleccionado.MARCA;
            let nombre=ProductoSeleccionado.NOMBRE;
            let precio=ProductoSeleccionado.PROD_PRECIO_VENTA;
           // let cantida=keyword[posicionJson].cantidad;

            let filaCantidadInput=document.getElementById("idfilaCantidadinput").value;
           

            tablaVenta.insertRow(0).innerHTML =` <tr>
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
        cantidadDeFilas++;
     

        let cantidaDeProductosInput=document.getElementById("idfilaCantidadinput").value;
        subTotal=subTotal+(precio*cantidaDeProductosInput);

        localStorage.setItem("subTotal", subTotal);        
                  
        localStorage.getItem("cantidadDeFilas", cantidadDeFilas);
  
        let AUXcantidaDeProductosInput=document.getElementById("idfilaCantidadinput").value;
        jsonEnvio.push({id:cantidadDeFilas,idproducto:ProductoSeleccionado.ID_PRODUCTO,
            marca:ProductoSeleccionado.MARCA,nombre:ProductoSeleccionado.NOMBRE,
            precio:ProductoSeleccionado.PROD_PRECIO_VENTA,cantidad:AUXcantidaDeProductosInput});
        //cantidadDeFilas++; conflicto      
        
        console.log(jsonEnvio);
        
    }
    document.getElementById("autocompletadoBuscarCliente").value="";
    
    document.getElementById("idfilaCantidadinput").value=1;
    const filaProductoPrincipal = document.getElementById('idfilaProductoprincipal');
    filaProductoPrincipal.classList.add("d-none")

    document.getElementById("idtotal").innerHTML=subTotal+" $";

    //idRedondeo
    let aaaa=444.88;
    Math.round(aaaa,2)
    console.log(Math.round(aaaa,2));
    //idtotalApagar


   
}

function GuardarVenta() {
    let formularioProductos=document.getElementById("idformularioProductos");
    fetch('../Controlador/RealizarVenta.php', {
        method: 'POST',
        body: new FormData(formularioProductos)
    })
  

    .then((data)=>{

        console.log(data);

         document.getElementById("idestadoDeVenta").innerHTML="Venta Exitosa"+data;

    });
}

function TraerProductosdeDDBB(inputTexto){
    let datasalida="",resultado="";
    fetch('../Controlador/MostrarProductos.php', {
        method: 'POST'
    })
   
    .then((res)=>res.json())

    .then((data)=>{
        //console.log(data);
        datasalida=JSON.parse(JSON.stringify(data));
       
        let templista=[];
        const AuxPalabraFiltrada = datasalida.filter( datasalida => templista.push(datasalida.NOMBRE)
                                                     , resultado=datasalida                             );
        const palabraFiltrada = templista.filter(templista => templista.toLowerCase().includes(inputTexto));
        
        //console.log("---"+resultado[0].PROD_PRECIO_VENTA);
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


    