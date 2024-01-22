<?php include '../Controlador/db.php'; ?>

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $usuario_registrado = 2;
    $estado = 1;
    $nombre = $_POST['frmNuevoClienteNombre'];
    $apellido = $_POST['frmNuevoClienteApellido'];
    $apodo = $_POST['frmNuevoClienteApodo'];
    date_default_timezone_set('America/Argentina/Buenos_Aires');
    $fecha_alta = date('Y-m-d H:i:s');
    $fecha_baja = null;

    if (!empty($nombre) && !empty($apellido)) {
        $consultaInsert = "INSERT INTO `cliente`(`ID_usuario_registrado`, `Nombre`, `Apellido`, `Apodo`, `Fecha_alta`, `Fecha_baja`, `Estado`) 
        VALUES (:ID_usuario_registrado,:Nombre, :Apellido, :Apodo,:Fecha_alta,:Fecha_baja,:Estado)";

        try {
            $consulta = $conn->prepare($consultaInsert);
            $consulta->bindParam(':ID_usuario_registrado', $usuario_registrado);
            $consulta->bindParam(':Nombre', $nombre);
            $consulta->bindParam(':Apellido', $apellido);
            // if (!empty($apodo)) {
            $consulta->bindParam(':Apodo', $apodo);
            $consulta->bindParam(':Fecha_alta', $fecha_alta);
            $consulta->bindParam(':Fecha_baja', $fecha_baja);
            $consulta->bindParam(':Estado', $estado);
            // };


            $consulta->execute();
            $conn->beginTransaction();
            $conn->commit();
            // echo "<h6>Insercion exitosa</h6>";
            header("Location:../Vista/VendedorCrearCliente.php");
            exit;
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    } else {
        echo "Algunos campos están vacíos. Por favor, completa todos los campos.";
    }
}
?>