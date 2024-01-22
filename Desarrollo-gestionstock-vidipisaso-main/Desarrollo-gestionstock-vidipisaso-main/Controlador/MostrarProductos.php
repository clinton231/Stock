<?php

require_once("./db.php");

    //SELECT `id`, `descripcion` FROM `provincias` WHERE 1
    print_r( json_encode(Leer('SELECT `ID_PRODUCTO`,  `MARCA`, `NOMBRE`,  
    `PROD_PRECIO_VENTA`,`CANTIDAD` FROM `producto` WHERE 1')));

?>