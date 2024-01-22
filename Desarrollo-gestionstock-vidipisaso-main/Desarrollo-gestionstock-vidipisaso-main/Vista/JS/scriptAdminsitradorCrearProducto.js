window.onload = inicio;

function inicio() {
    const btnAgregarProd = document.getElementById('btnAgregarProducto');
    btnAgregarProd.addEventListener('click',agregarFila);
}

function agregarFila() {

    var prodNombre = document.getElementById('pNombre').value;
    var idProd = document.getElementById('id').value;
    var marcaProd = document.getElementById('marca').value;
    var descripcionProd = document.getElementById('descripcion').value;
    var precioCompraProd = document.getElementById('precioCompra').value;
    var precioVentaProd = document.getElementById('precioVenta').value;
    var pesoProd = document.getElementById('peso').value;
    var fechaProd = document.getElementById('fecha').value;

 
    if(prodNombre!="" && idProd!=""){
        var table = document.getElementById('productosTabla').getElementsByTagName('tbody')[0];
        var newRow = table.insertRow(table.rows.length);
        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);
        var cell4 = newRow.insertCell(3);
        var cell5 = newRow.insertCell(4);
        var cell6 = newRow.insertCell(5);
        var cell7 = newRow.insertCell(6);
        var cell8 = newRow.insertCell(7);


        cell1.innerHTML = idProd;
        cell2.innerHTML = prodNombre;
        cell3.innerHTML = marcaProd;
        cell4.innerHTML = descripcionProd;
        cell5.innerHTML = precioCompraProd;
        cell6.innerHTML = precioVentaProd;
        cell7.innerHTML = pesoProd;
        cell8.innerHTML = fechaProd;

    
}else{
    var invalido = document.getElementById('validador');
    invalido.classList.remove("d-none");

}

    document.getElementById('formProducto').reset();
}