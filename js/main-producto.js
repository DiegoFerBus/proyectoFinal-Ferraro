
function renderProducto() {
    const producto = cargarProducto();
    let htmlImagenProducto = `<img src="${producto.imagen}" class="img-fluid" alt="${producto.nombre}" />`;
    let htmlDetalleProducto = `<h1>${producto.nombre}</h1>
    <p><b style="color: red;">AVISO:</b>Los envíos son solo dentro de Montevideo.</p>
    <p>${producto.categoria}</p>`;
    document.getElementById("imagenProducto").innerHTML = htmlImagenProducto;
    document.getElementById("detalleProducto").innerHTML = htmlDetalleProducto;
}

renderProducto();
