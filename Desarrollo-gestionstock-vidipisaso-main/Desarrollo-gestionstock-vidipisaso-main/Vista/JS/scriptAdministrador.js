
// scripts.js
document.addEventListener("DOMContentLoaded", function() {
    // Datos codificados de productos más vendidos
    var productosMasVendidos = {
        labels: ['Alfajor Arcor', 'Chocolate Milkout', 'Leche Entrea', 'Chicle Beldent', 'Malboro Box', 'Encendor Bic'],
        data: [320, 230, 180, 150, 100, 80]
    };

    // Obtener el contexto del gráfico
    var ctx = document.getElementById('graficoProductosMasVendidos').getContext('2d');

    // Configurar los datos para el gráfico de dona
    var data = {
        labels: productosMasVendidos.labels,
        datasets: [{
            label: 'Cantidad Vendida',
            data: productosMasVendidos.data,
            backgroundColor: [
                'rgba(255, 99, 132)',
                'rgba(54, 162, 235)',
                'rgba(255, 206, 86)',
                'rgba(75, 192,192)',
                'rgba(153, 102, 255)',
                'rgba(255, 159, 64)'
            ],
            borderColor: [
                'rgba(255, 99, 132)',
                'rgba(54, 162, 235)',
                'rgba(255, 206, 86)',
                'rgba(75, 192,192)',
                'rgba(153, 102, 255)',
                'rgba(255, 159, 64)'
            ],
            borderWidth: 1
        }]
    };

    // Configurar las opciones del gráfico
    var options = {
        scales: {
            y: {
                beginAtZero: false
            }
        }
    };

    // Crear el gráfico de barras
    var grafico = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: options
    });
});



// scripts.js
document.addEventListener("DOMContentLoaded", function() {
    // Datos codificados de vendedores destacados
    var vendedoresDestacados = {
        labels: ['Paola', 'Carlos', 'Enrique'],
        data: [230, 500, 380]
    };

    // Obtener el contexto del gráfico
    var ctx = document.getElementById('graficoVendedoresMasVendieron').getContext('2d');

    // Configurar los datos para el gráfico de barras
    var data = {
        labels: vendedoresDestacados.labels,
        datasets: [{
            label: 'Ventas Realizadas',
            data: vendedoresDestacados.data,
            backgroundColor: 'rgba(75, 192, 192)',
            borderColor: 'rgba(75, 192, 192)',
            borderWidth: 1
        }]
    };

    // Configurar las opciones del gráfico
    var options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    // Crear el gráfico de barras
    var grafico = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });
});




