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

  <script src="./JS/scriptAdministradorAjuste.js" defer></script>

  <title>StVent-Crear Ajuste</title>
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
      <h1 class="text-center mt-3">Crear ajuste</h1>




      <table class="table table-dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Marca</th>
            <th>Categoria</th>
            <th>SubCategoria</th>
            <th>Precio</th>
            <th>Ajuste(%)</th>
            <th>Precio ajustado</th>
            <th>Acciones</th>
            <th></th>

          </tr>
        </thead>
        <tbody>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </tbody>

      </table>

      <!-- Button trigger modal -->
      <!-- <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Crear Ajuste (Nombre)
</button> -->

      <!-- Modal -->
      <!-- <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Busqueda de ajuste</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary">Guardar cambio</button>
      </div>
    </div>
  </div>
</div> -->

      <div id="idbotones-pantalla-venta">
        <div>
          <button class="btn btn-danger py-1" id="btnInsertar" data-bs-toggle="modal" data-bs-target="#modalUpdate"> Crear Ajuste (Nombre)</button>
        </div>
      </div>

      <!-- Modal -->
      <div class="modal" id="modalUpdate">
        <div class="modal-dialog">
          <div class="modal-content">

            <!-- Header -->
            <div class="modal-header bg-dark text-white">
              <h4 class="modal-title">Nuevo Ajuste</h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <!-- Modal body -->
            <div class="modal-body bg-dark text-white">
              <form action="/Desarrollo-gestionstock-vidipisaso2/Vista/AdministradorCrearUsuario.php" id="formProducto" method="post">

                <!-- <label for="nombre">Nombre</label><br>
                <input class="form-control" type="text" id="nombre" name="nombre" ><br>

                <label for="password">Password</label><br>
                <input class="form-control" type="password"  id="password" name="password" ><br>
                isaso2/Vista/AdministradorCrearUsuario.php">email</label><br>
                <input class="form-control" type="email"  id="email" name="email" ><br> -->

                <!-- Submit btn -->
                <!-- <input type="submit" class="btn btn-success" value="Actualizar" id="btnAgregarUsuario"> -->


                <div class="card-body">
                  <div class="row">
                    <div class="input-group">
                      <input class="form-control" type="search" id="autocompletadoBuscarCliente" placeholder="Escribe aquí el producto..." aria-label="Search">
                      <button class="input-group-text btn btn-outline-danger" type="button"><i class="bi bi-search"></i></button>

                      <ul id="listaProductos" class="card position-absolute top-100 start-10">
                      </ul>
                      <div id="smsResultado" class="card position-absolute d-none text-danger">No se encontraron resultados</div>

                    </div>
                    <div>
                      <table class="table table-dark mt-2">
                        <thead>
                          <tr>
                            <th>Producto</th>
                            <th>Ajuste(%)</th>
                            <th>Acciones</th>

                          </tr>
                        </thead>
                        <tbody>
                          <tr id="idfilaProductoprincipal" class="d-none">
                            <td class="ocultar-en-pantalla-xs ocultar-en-pantalla-sm ocultar-en-pantalla-md" scope="row"></td>
                            <td class="col-1 ocultar-en-pantalla-xs ocultar-en-pantalla-sm ocultar-en-pantalla-md text-center" id="idfilaCantidad" scope="col">
                              <input type="number" id="idfilaCantidadinput" class="form-control text-center" value="1" min="0" step='5'>
                            </td>

                            <td class="col-1 ocultar-en-pantalla-sm ocultar-en-pantalla-md text-center" scope="col">
                              <div class="btn-group" role="group" aria-label="Grupo botones">
                                <button class="btn btn-primary btn-sm" data-btn-grupo="modificar-cliente">
                                  <i id="id_Agregar_producto_Tabla" class="bi bi-check-lg"></i>
                                </button>
                                <button type="button" class="btn btn-danger btn-sm" data-btn-grupo="eliminar-cliente">
                                  <i id="id_Eliminar_producto_Tabla" class="bi bi-trash"></i>
                                </button>
                              </div>
                            </td>
                            <td class="ocultar-en-pantalla-xs ocultar-en-pantalla-sm ocultar-en-pantalla-md text-center" scope="col"></td>
                            <td class="text-center" scope="col"></td>
                            <td class="col-1 ocultar-en-pantalla-xs ocultar-en-pantalla-sm ocultar-en-pantalla-md text-center" id="idfilaPrecio" scope="col">
                              <!-- si saco el td solucion el problema de reajuste
                                                         de pagina pero no accedo a idfilaCantidadinput-->

                            </td>

                          </tr>
                        </tbody>

                      </table>
                    </div>


              </form>
            </div>

            <!-- Modal footer -->
            <div class="modal-footer bg-dark text-white">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Volver</button>
              <button type="button" class="btn btn-primary" id="idvenderboton">Guardar Cambios</button>

            </div>


          </div>
        </div>
      </div>


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