<?php include '../Controlador/UpdateListaClienteEditar.php'; ?>
<?php include '../Controlador/SelectVendedorListaCliente.php' ?>

<?php
session_start();
include '../Controlador/dbTwo.php';

if (!isset($_SESSION['usuario']) && !isset($_SESSION['perfil'])) {
    header('Location:index.php');
    die();
}
?>

<?php $db = new Database(); ?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!--Css-->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link rel="stylesheet" href="./CSS/mystyle.css">
    <link rel="stylesheet" href="CSS/VendedorBuscador.css">
    <link rel="stylesheet" href="CSS/redimensionar-tabla.css">
    <link rel="icon" href="Icon.ico">

    <!--icon-->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">

    <!--JavaScript-->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous" defer></script>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="./JS/scriptBuscarCliente.js"></script>
    <script src="./JS/scriptFuncionalidadBoton.js"></script>
    <title>StVent-Iniciar Sesion</title>
</head>

<body>
    <nav class="navbar navbar-expand-lg  bg-black">
        <div class="container-fluid">
            <a class="navbar-brand text-light fs-5" href="#">StVent</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link active text-warning mt-1 fs-6" aria-current="page" href="VendedorVender.html">Vender</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-warning mt-1 fs-6" href="VendedorCrearCliente.php">Crear Cliente</a>
                    </li>
                    <li class="nav-item"><a class="nav-link text-warning mt-1 fs-6" href="VendedorProductoBuscarCargarStock.html">Producto</a>
                    </li>
                </ul>
            </div>
            <ul class="navbar-nav">
                <li class="nav-item text-end">
                    <a class="nav-link" href="../Controlador/Logout.php"><button class="btn btn-danger py-1" id="salir">Cerrar sesion</button></a>
                </li>
            </ul>
        </div>
    </nav>
    <section class="container mt-4 w-75">
        <!-- formulario nuevo usuario - inicio -->
        <div class="bg-black pt-3 pb-3 px-3 rounded-1" id="divOcultarMostrarBusqueda">
            <form class="d-block" role="search" id="divOcultarMostrarBusqueda">
                <div class="input-group">
                    <input class="form-control" type="search" id="autocompletadoBuscarCliente" placeholder="Escribe aquí..." aria-label="Search">
                    <button class="input-group-text btn btn-outline-danger" type="button"><i class="bi bi-search"></i></button>
                </div>
                <ul id="listaCliente" class="list-unstyled">
                </ul>
                <div id="smsResultado" class="d-none text-danger">No se encontraron resultados</div>
            </form>
            <div class="mx-auto mt-3" id="divOcultarMostrarBusqueda">
                <!-- <h6>Filtrar por (predeterminado: nombre):</h6> -->
                <div class="row">
                    <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioFiltro" id="flexRadioFiltrarPorNombre" checked>
                            <label class="form-check-label text-warning" for="flexRadioFiltrarPorNombre">Nombre</label>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioFiltro" id="flexRadioFiltrarPorApellido">
                            <label class="form-check-label text-warning" for="flexRadioFiltrarPorApellido">Apellido</label>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioFiltro" id="flexRadioFiltrarPorIdCliente">
                            <label class="form-check-label text-warning" for="flexRadioFiltrarPorIdCliente">ID Cliente</label>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioFiltro" id="flexRadioFiltrarFecha">
                            <label class="form-check-label text-warning" for="flexRadioFiltrarFecha">Fecha</label>
                        </div>
                    </div>
                </div>
            </div>
            <div id="divOcultarMostrarTablaClientes" class="mx-auto mt-3 mb-1 col-12">
                <div class="card bg-dark text-light">
                    <div class="card-header">
                        <h5>Clientes</h5>
                    </div>
                    <div class="card-body">
                        <!-- tabla: tabla Cliente - inicio -->
                        <div class="table-responsive mx-auto">
                            <table id="tablaCliente" class="table table-dark table-striped">
                                <thead>
                                    <tr>
                                        <th class="" scope="col">#</th>
                                        <th class="text-center" scope="col">ID Cliente</th>
                                        <th class="text-center ocultar-en-pantalla-xs ocultar-en-pantalla-sm ocultar-en-pantalla-md text-center" scope="col">ID Vendedor</th>
                                        <th class="text-center" scope="col">Nombre</th>
                                        <th class="text-center ocultar-en-pantalla-xs" scope="col">Apellido</th>
                                        <th class="text-center d-none" scope="col">Apodo</th>
                                        <th class="text-center ocultar-en-pantalla-xs ocultar-en-pantalla-sm ocultar-en-pantalla-md text-center" scope="col">Fecha de Alta</th>
                                        <th class="text-center d-none" scope="col">Fecha de Baja</th>
                                        <th class="text-center" scope="col">Estado</th>
                                        <th class="text-center" scope="col">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php
                                    $db->generarTabla();
                                    ?>
                                </tbody>
                            </table>
                        </div>
                        <!-- tabla: tabla usuarios - fin -->
                        <!-- paginador - inicio -->
                        <nav aria-label="Ejemplo paginador">
                            <ul class="pagination justify-content-center">
                                <li class="page-item">
                                    <a class="page-link bg-dark text-light" href="#" aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                    </a>
                                </li>
                                <li class="page-item active"><a class="page-link bg-dark text-light" href="#">1</a></li>
                                <li class="page-item"><a class="page-link bg-dark text-light" href="#">2</a></li>
                                <li class="page-item"><a class="page-link bg-dark text-light" href="#">3</a></li>
                                <li class="page-item">
                                    <a class="page-link bg-dark text-light" href="#" aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                        <!-- paginador - fin -->
                    </div>
                </div>
            </div>
        </div>
    </section>
    <footer class="bg-black text-center text-lg-start mt-4 d-flex">
        <div class="text-center p-3 text-warning">
            © 2020 Copyright:
            <a class="text-warning" href="https://mdbootstrap.com/">MDBootstrap.com</a>
        </div>
    </footer>
    <!-- Modal Detalle -->
    <div class="modal fade w-100" id="modalDetalleCliente" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-primary-subtle">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Detalles de Clientes</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body bg-black">
                    <form id="frmDetalleCliente">
                        <div class="card bg-dark text-light">
                            <div class="card-header text-light">
                                <h5 id="infoCliente"></h5>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="mx-auto mb-3 col-xs-4 col-sm-12 col-md-6 col-lg-6" id="divFrmClienteID">
                                        <label for="frmClienteID" class="form-label">ID Cliente</label>
                                        <input type="number" class="form-control" id="frmClienteID" disabled />
                                    </div>
                                    <div class="mx-auto mb-3 col-xs-4 col-sm-12 col-md-6 col-lg-6" id="divFrmClienteIDUsuarioRegistrado">
                                        <label for="frmClienteIDUsuarioRegistrado" class="form-label">ID Vendedor</label>
                                        <input type="number" class="form-control" id="frmClienteIDUsuarioRegistrado" disabled />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="mx-auto mb-3 col-xs-4 col-sm-12 col-md-6 col-lg-6" id="divFrmClienteNombre">
                                        <label for="frmClienteNombre" class="form-label">Nombre</label>
                                        <input type="text" class="form-control" id="frmClienteNombre" disabled />
                                    </div>
                                    <div class="mx-auto mb-3 col-xs-4 col-sm-12 col-md-6 col-lg-6" id="divFrmClienteApellido">
                                        <label for="frmClienteApellido" class="form-label">Apellido</label>
                                        <input type="text" class="form-control" id="frmClienteApellido" disabled />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="mx-auto mb-3 col-xs-4 col-sm-12 col-md-6 col-lg-6" id="divFrmClienteApodo">
                                        <label for="frmClienteApodo" class="form-label">Apodo</label>
                                        <input type="text" class="form-control" id="frmClienteApodo" disabled />
                                    </div>
                                    <div class="mx-auto mb-3 col-xs-4 col-sm-12 col-md-6 col-lg-6" id="divFrmClienteFechaAlta">
                                        <label for="frmClienteFechaAlta" class="form-label">Fecha de Alta</label>
                                        <input type="datetime" class="form-control" id="frmClienteFechaAlta" disabled />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="mx-auto mb-3 col-xs-4 col-sm-12 col-md-12 col-lg-12" id="divFrmClienteFechaBaja">
                                        <label for="frmClienteFechaBaja" class="form-label">Fecha de Baja</label>
                                        <input type="datetime" class="form-control" id="frmClienteFechaBaja" disabled />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer bg-black">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Editar -->
    <div class="modal fade" id="modalEditarCliente" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-primary-subtle">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Editar Cliente</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body bg-black">
                    <form id="frmModificarCliente" action="VendedorListaCliente.php" method="POST">
                        <div class="card bg-dark text-light">
                            <div class="card-header text-light">
                                <h5 id="infoEditarCliente"></h5>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="mx-auto mb-3 col-xs-12 col-sm-12 col-md-6 col-lg-6" id="divFrmEditarClienteID">
                                        <label for="frmEditarClienteID" class="form-label">ID Cliente:</label>
                                        <input type="number" class="form-control" id="frmEditarClienteID" name="frmEditarClienteID" readonly />
                                        <div class="invalid-feedback" id="errorEditarClienteID"></div>
                                    </div>
                                    <div class="mx-auto mb-3 col-xs-4 col-sm-12 col-md-6 col-lg-6" id="divFrmEditarClienteNombre">
                                        <label for="frmEditarClienteNombre" class="form-label">Nombre:</label>
                                        <input type="text" class="form-control" id="frmEditarClienteNombre" name="frmEditarClienteNombre" />
                                        <div class="invalid-feedback" id="errorEditarClienteNombre"></div>
                                    </div>
                                    <div class="mx-auto mb-3 col-xs-12 col-sm-12 col-md-6 col-lg-6" id="divFrmEditarClienteApellido">
                                        <label for="frmEditarClienteApellido" class="form-label">Apellido:</label>
                                        <input type="text" class="form-control" id="frmEditarClienteApellido" name="frmEditarClienteApellido" />
                                        <div class="invalid-feedback" id="errorEditarClienteApellido"></div>
                                    </div>
                                    <div class="mx-auto mb-3 col-xs-12 col-sm-12 col-md-6 col-lg-6" id="divFrmEditarClienteApodo">
                                        <label for="frmEditarClienteApodo" class="form-label">Apodo:</label>
                                        <input type="text" class="form-control" id="frmEditarClienteApodo" name="frmEditarClienteApodo" />
                                        <div class="invalid-feedback" id="errorEditarClienteApodo"></div>
                                    </div>
                                    <div class="mx-auto mb-3 col-xs-12 col-sm-12 col-md-6 col-lg-6" id="divFrmEditarClienteEstado">
                                        <label for="frmEditarClienteEstado" class="form-label">Estado Actual:</label>
                                        <input type="text" class="form-control" id="frmEditarClienteEstado" readonly />
                                        <div class="invalid-feedback" id="errorEditarClienteApodo"></div>
                                    </div>
                                    <div class="mx-auto mb-3 col-xs-12 col-sm-12 col-md-6 col-lg-6" id="divFrmEditarClienteEstadoSelect">
                                        <label for="frmEditarClienteEstadoSelect" class="form-label">Cambiar estado:</label>
                                        <select class="form-select" name="frmEditarClienteEstadoSelect" id="frmEditarClienteEstadoSelect" aria-label="Default select example">
                                            <option value="1">Habilitar</option>
                                            <option value="0">Inhabilitar</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer bg-black">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="submit" class="btn btn-primary" id="botonGuardarCambios" form="frmModificarCliente">Guardar Cambios</button>
                </div>
            </div>
        </div>
    </div>
</body>

</html>
<?php $db->closeConnection(); ?>