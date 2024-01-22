<?php include 'db.php' ?>

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") { // Verifica si la solicitud es de tipo POST

    $id = $_POST['frmEditarClienteID'];
    $nombre = $_POST['frmEditarClienteNombre'];
    $apellido = $_POST['frmEditarClienteApellido'];
    $apodo = $_POST['frmEditarClienteApodo'];
    date_default_timezone_set('America/Argentina/Buenos_Aires');
    $fechaBaja = date('Y-m-d H:i:s');
    $estado = $_POST['frmEditarClienteEstadoSelect'];

    if (!empty($id) && !empty($nombre) && !empty($apellido)) { // Comprueba si las variables no están vacías

        try {
            $consultaUpdate = "UPDATE `cliente` SET `Nombre`=:nombre, `Apellido`=:apellido, `Apodo`=:apodo, `Fecha_baja`=:fechaBaja, `Estado`=:estado WHERE `ID_cliente`=:id";

            $consulta = $conn->prepare($consultaUpdate);
            $consulta->bindParam(':nombre', $nombre);
            $consulta->bindParam(':apellido', $apellido);
            $consulta->bindParam(':apodo', $apodo);
            $consulta->bindParam(':fechaBaja', $fechaBaja);
            $consulta->bindParam(':estado', $estado);
            $consulta->bindParam(':id', $id);

            $consulta->execute();

            // echo "La actualización se realizó con éxito.";
        } catch (PDOException $e) {
            echo "Error en la actualización: " . $e->getMessage();
        }
    } else {
        echo "Algunos campos están vacíos. Por favor, completa todos los campos.";
    }
}
?>

