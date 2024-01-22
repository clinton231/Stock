<?php
class Database
{
    private $conn;

    public function __construct()
    {
        $servername = "localhost";
        $username = "root";
        $password = "";
        $db = "stvent";

        try {
            $this->conn = new PDO("mysql:host=$servername;dbname=" . $db . ";charset=utf8", $username, $password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
            die();
        }
    }

    public function generarTabla()
    {
        $nroFila = 1;
        $consultaSelect = $this->conn->query("SELECT `ID_cliente`, `ID_usuario_registrado`, `Nombre`, `Apellido`, `Apodo`, `Fecha_alta`, `Fecha_baja`, `Estado` FROM `cliente`");

        while ($row = $consultaSelect->fetch()) {
            if ($row['Estado'] == 1) {
                $estado = 'Habilitado';
            } elseif ($row['Estado'] == 0) {
                $estado = 'Inhabilitado';
            }
            echo "<tr>";
            echo "<td class='text-center'>" . $nroFila . "</td>";
            echo "<td class='text-center'>" . $row['ID_cliente'] . "</td>";
            echo "<td class='text-center ocultar-en-pantalla-xs ocultar-en-pantalla-sm ocultar-en-pantalla-md text-center'>" . $row['ID_usuario_registrado'] . "</td>";
            echo "<td class='text-center'>" . $row['Nombre'] . "</td>";
            echo "<td class='text-center ocultar-en-pantalla-xs'>" . $row['Apellido'] . "</td>";
            echo "<td class='text-center d-none'>" . $row['Apodo'] . "</td>";
            echo "<td class='text-center ocultar-en-pantalla-xs ocultar-en-pantalla-sm ocultar-en-pantalla-md'>" . $row['Fecha_alta'] . "</td>";
            echo "<td class='text-center d-none'>" . $row['Fecha_baja'] . "</td>";
            echo "<td class='text-center'>" . $estado . "</td>";
            echo "<td class='text-center'><div class='btn-group' role='group' aria-label='Grupo botones'><button type='button' id='botonDetalleCliente' class='btn btn-success btn-sm' data-btn-grupo='mostrar-detalles-cliente'><i class='bi bi-eye'></i></button><button class='btn btn-primary btn-sm' data-btn-grupo='modificar-cliente'><i class='bi bi-pencil'></i></div></td>";
            echo "</tr>";
            $nroFila++;
        }
    }

    public function closeConnection()
    {
        $this->conn = null;
    }
}
