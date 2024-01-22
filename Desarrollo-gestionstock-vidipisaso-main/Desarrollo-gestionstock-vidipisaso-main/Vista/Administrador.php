<?php include("../Controlador/db.php"); ?>

<?php
session_start();

if (!isset($_SESSION['usuario']) && !isset($_SESSION['perfil'])) {
  header('Location:index.php');
  die();
}
?>
<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" />
  <link rel="stylesheet" href="CSS/mystyle.css" />
  <link rel="stylesheet" href="./CSS/AdministradorReporte.css">
  <link rel="icon" href="/Icon.ico" />

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous" defer></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@3.7.0/dist/chart.min.js"></script>

  <script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns/dist/chartjs-adapter-date-fns.bundle.min.js"></script>

  <script src="JS/scriptAdministrador.js" defer></script>
  <title>StVent-Administrador</title>
</head>

<body>
  <!-- implementar template administrador -->

  <!-- Navbar Admin. -->
  <div>
    <nav class="navbar navbar-expand-lg bg-black">
      <div class="container-fluid">
        <a class="navbar-brand text-light fs-5" href="Administrador.php">StVent</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="cista/Administrador.htmlollapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link active text-warning mt-1 fs-6" aria-current="page" href="Administrador.php">Inicio</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-warning mt-1 fs-6" href="AdministradorCrearUsuario.php">Crear Usuario</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-warning mt-1 fs-6" href="AdministradorCrearProducto.php">Crear Producto</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-warning mt-1 fs-6" href="#">Crear Inidicador</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-warning mt-1 fs-6" href="AdministradorAjuste.php">Crear Ajuste</a>
            </li>

            <li class="nav-item dropdown">
              <a class="nav-link text-warning dropdown-toggle mt-1 fs-6" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Generar Reporte
              </a>
              <ul class="dropdown-menu bg-black">
                <li><a class="dropdown-item text-warning" href="#">Ventas</a></li>
                <li><a class="dropdown-item text-warning" href="#">Vendedor</a></li>
                <li><a class="dropdown-item text-warning" href="#">Recaudación</a></li>
              </ul>
            </li>


            <!-- <li class="nav-item">
                <a class="nav-link text-warning mt-1 fs-6" href="#"
                  >Generar Reporte</a
                > -->
            </li>
            <li class="nav-item">
              <a class="nav-link text-warning mt-1 fs-6" href="#">Visualizar Logs</a>
            </li>
          </ul>
        </div>
        <ul class="navbar-nav">
          <li class="nav-item text-end">
            <a class="nav-link" href="../Controlador/Logout.php"><button class="btn btn-danger py-1" id="salir">
                Cerrar sesion
              </button></a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
  <div>
    <!-- Fin navbar -->

    <div>
      <h1 class="text-center mt-3">Bienvenido - Reportes</h1>
      <div class="container estadisticas text-center mt-5">
        <div class="row">
          <h2>Productos más Vendidos en el mes</h2>
          <div class="row">
            <div class="col-md-6 mx-auto">

              <div class="chartCard">
                <div class="chartBox">
                  <input type="date" onchange='startDateFilter(this)' value='2023-09-01'>
                  <input type="date" onchange='endDateFilter(this)' value='2023-09-30'>
                  <canvas id="myChart"></canvas>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="container estadisticas text-center mt-5">
      <div class="row">
        <h2>Productos más Vendidos en el mes</h2>
        <div class="row">
          <div class="col-md-6 mx-auto">
            <canvas id="graficoProductosMasVendidos"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>


  <div>
    <div class="container estadisticas text-center mt-5">
      <div class="row mt-3">
        <h2>Vendedores Destacados</h2>
        <div class="row">
          <div class="col-md-6  mx-auto">
            <canvas id="graficoVendedoresMasVendieron"></canvas>
          </div>
        </div>
      </div>
    </div>

    <?php
    try {
      $sql = "SELECT * FROM dbtest2.telsa";
      $result = $conn->query($sql);

      if ($result->rowCount() > 0) {
        while ($row = $result->fetch()) {
          $dateArray[] = $row["date"];
          $priceArray[] = $row["price"];
        }

        unset($result);
      } else {
        echo 'No hay resultado en DB';
      }
    } catch (PDOException $e) {
      die('Error');
    }

    unset($conn);
    // print_r($dateArray)
    ?>




    <script>
      const dateArrayJS = <?php echo json_encode($dateArray); ?>;
      //console.log(dateArrayJS);

      const dateChartJs = dateArrayJS.map((dia, index) => {
        let diaJS = new Date(dia);
        // console.log(diaJS);
        return diaJS.setHours(0, 0, 0, 0);
      });

      // setup 
      const data = {
        labels: dateChartJs,
        datasets: [{
          label: 'Ventas Diarias',
          data: <?php echo json_encode($priceArray); ?>,
          backgroundColor: [
            'rgba(75, 192, 192)'
          ],
          borderColor: [
            'rgba(75, 192, 192)'
          ],
          borderWidth: 1
        }]
      };

      // config 
      const config = {
        type: 'bar',
        data,
        options: {
          autoSkip: false,
          scales: {
            x: {
              // min:'2023-09-01',
              // max:'2023-09-30',
              type: 'time',
              time: {
                unit: 'day'
              }
            },
            y: {
              beginAtZero: true
            }
          }
        }
      };

      // render init block
      const myChart = new Chart(
        document.getElementById('myChart'),
        config
      );

      // // Instantly assign Chart.js version
      // const chartVersion = document.getElementById('chartVersion');
      // chartVersion.innerText = Chart.version;



      function startDateFilter(date) {
        const startDate = new Date(date.value);
        console.log(startDate.setHours(0, 0, 0, 0));
        // console.log('hgola');
        myChart.config.options.scales.x.min = startDate.setHours(0, 0, 0, 0);
        myChart.update();
      }

      function endDateFilter(date) {
        const endDate = new Date(date.value);
        console.log(endDate.setHours(0, 0, 0, 0));
        // console.log('hgola');
        myChart.config.options.scales.x.max = endDate.setHours(0, 0, 0, 0);
        myChart.update();
      }
    </script>









    <!-- Pie de Indicadores -->
    <br>
    <div id="iddivindicadores" class="fixed-bottom p-3 mb-2 bg-dark text-white">Indicador
      <div class="btn-group btn-group-toggle">
        <label class="btn btn-light" id="idlabelventaverde">

        </label>
        <label class="btn btn-dark" id="idlabelventarojo">

        </label>
      </div>
    </div>
</body>

</html>