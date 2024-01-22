<?php include "dbTwo.php" ?>

<?php
$consultaSelect = "SELECT `ID_CATEGORIA`, `NOMBRE` FROM `categoria`";

try {
    $consulta = $conn->query($consultaSelect);

    header('Content-Type: application/json');
    $registro = $consulta->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($registro);
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>