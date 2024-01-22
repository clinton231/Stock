<?php include '../Controlador/dbTwo.php' ?>

<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $nivel = $_POST['limiteDeAviso'];
    $producto = $_POST['selectProducto'];
    $categoria = $_POST['selectCategoria'];
    $idUsuario = $_SESSION['ID'];

    if (!empty($nivel) && !empty($producto) && !empty($categoria) && !empty($idUsuario)) {

        $insertConsulta = "INSERT INTO `indicador`(`ID_USUARIO_REGISTRADO`, `ID_CATEGORIA`, `ID_PRODUCTO`, `NIVEL`) 
        VALUES (:IDUsuario,:IDCategoria,:IDProducto,:Nivel)";

        try {
            $consulta = $conn->prepare($insertConsulta);
            $consulta->bindParam(':IDUsuario', $idUsuario);
            $consulta->bindParam(':IDCategoria', $categoria);
            $consulta->bindParam(':IDProducto', $producto);
            $consulta->bindParam(':Nivel', $nivel);
            $consulta->execute();
        } catch (PDOException $e) {
            echo "Error en la consulta: " . $e->getMessage();
        }
    } else {
        echo "Algunos campos están vacíos. Por favor, completa todos los campos.";
    }
}
?>