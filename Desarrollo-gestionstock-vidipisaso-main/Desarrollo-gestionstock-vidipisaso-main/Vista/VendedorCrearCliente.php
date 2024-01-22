<?php include '../Controlador/InsertCrearCliente.php'; ?>

<?php
session_start();
include '../Controlador/dbTwo.php';

if (!isset($_SESSION['usuario']) && !isset($_SESSION['perfil'])) {
    header('Location:index.php');
    die();
}

?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!--Css-->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link rel="stylesheet" href="CSS/mystyle.css">
    <link rel="stylesheet" href="CSS/VendedoCrearLista.css">
    <link rel="icon" href="/Icon.ico">

    <!--icon-->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">

    <!--JavaScript-->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous" defer></script>
    <script src="./JS/scriptCrearCliente.js"></script>
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
                        <a class="nav-link text-warning mt-1 fs-6" href="VendedorListaCliente.php">Clientes</a>
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
    <section class="container mt-4 w-75" id="s">
        <!-- formulario nuevo usuario - inicio -->
        <div class="row">
            <div id="divMostrarOcultarFormularioNuevoUsuario" class="mx-auto my-1 col-12 bg-black py-3 px-2 rounded-1">
                <form id="frmNuevoCliente" action="VendedorCrearCliente.php" method="POST">
                    <div class="card  bg-dark text-light">
                        <div class="card-header text-light">
                            <h5>Nuevo Cliente</h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="mx-auto mb-3 col-xs-12 col-sm-12 col-md-4 col-lg-12">
                                    <label for="frmNuevoClienteNombre" class="form-label">Nombre</label>
                                    <input type="text" name="frmNuevoClienteNombre" class="form-control" id="frmNuevoClienteNombre" />
                                    <div class="invalid-feedback" id="errorNuevoClienteNombre"></div>
                                </div>
                                <div class="mx-auto mb-3 col-xs-12 col-sm-12 col-md-4 col-lg-12">
                                    <label for="frmNuevoClienteApellido" class="form-label">Apellido</label>
                                    <input type="text" name="frmNuevoClienteApellido" class="form-control" id="frmNuevoClienteApellido" />
                                    <div class="invalid-feedback" id="errorNuevoClienteApellido"></div>
                                </div>
                                <div class="mx-auto mb-3 col-xs-12 col-sm-12 col-md-4 col-lg-12">
                                    <label for="frmNuevoClienteApodo" class="form-label">Apodo</label>
                                    <input type="text" name="frmNuevoClienteApodo" class="form-control" id="frmNuevoClienteApodo" />
                                    <div class="invalid-feedback" id="errorNuevoClienteApodo"></div>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer">
                            <div class="d-grid gap-2">
                                <button id="btnCrearNuevoCliente" type="submit" class="btn btn-primary"> <i class="bi bi-plus-circle"></i>&nbsp;Crear cliente</button>
                                <button type="button" id="btnCancelarNuevoCliente" class="btn btn-secondary"><i class="bi bi-x-circle"></i>&nbsp;Cancelar</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>

    <footer class="bg-black text-center text-lg-start mt-4 d-flex">
        <div class="text-center p-3 text-warning">
            © 2020 Copyright:
            <a class="text-warning" href="https://mdbootstrap.com/">MDBootstrap.com</a>
        </div>
    </footer>

    <div class="modal fade" id="modalMostrarMensajes" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content bg-dark text-light">
                <div class="modal-header">
                    <h2 class="modal-title fs-5" id="modalTitulo">Cliente</h2>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" ria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <h6 id="modalTexto"></h6>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- modal mensajes - fin -->
</body>

</html>
<?php $conn = null; ?>