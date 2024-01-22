<?php include 'dbTwo.php'; ?>

<?php
$keywordsCliente = [];
$consulta = $conn->query("SELECT `ID_cliente`, `Nombre`, `Apellido`,`Fecha_alta` FROM `cliente`");

if ($consulta->rowCount()) {
    while ($row = $consulta->fetch(PDO::FETCH_ASSOC)) {

        $keywordsCliente[] = strval($row["ID_cliente"]); //strval se utiliza para convertir un valor en una cadena (string). 
        $keywordsCliente[] = $row["Nombre"];
        $keywordsCliente[] = $row["Apellido"];
        $keywordsCliente[] = $row["Fecha_alta"];
    }
} else {
    echo "No se encontraron resultados en la base de datos.";
}
// Convierte el array en JSON
echo json_encode($keywordsCliente); //json_encode convierte el array en una representación JSON
?>
<?php $conn = null; ?>