<?php

// destruir la sesion
session_start();
session_unset();
session_destroy();

// redirigir
header("Location:../Vista/index.php");
?>