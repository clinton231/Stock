function confirmar(e){
    if (confirm("¿Estas seguro que desea eliminar este usuario?")){
        return true;
    }
    else {
        e.preventDefault();
    }
}
let linkborrar = document.querySelectorAll(".table__item__link");
for (var i=0; i< linkborrar.length;i++){
    linkborrar[i].addEventListener('click',confirmar)
}