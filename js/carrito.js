function renderCarrito() {
    const carrito = cargarCarritoLS();
    let contenidoHTML;

    if (totalProductos() > 0) {
        contenidoHTML = '<table class="table"><tbody>';

        contenidoHTML += `<tr>
        <td class="text-end" colspan="4"><button class="btn btn-danger" onclick="vaciarCarrito();">Vaciar carrito</button></td>
    </tr>`;

        for (const producto of carrito) {
            contenidoHTML += `<tr>
            <td><img src="${producto.imagen}" alt="${producto.nombre}" width="90"></td>
            <td class="align-middle"><p class="text-dark"> <strong>${producto.nombre}</strong></p></td>
            <td class="align-middle">$${producto.precio}</td>
            <td class="text-end align-middle"><button class="btn btn-outline-danger" onclick="eliminarProducto(${producto.id});">Eliminar <i class="bi bi-x-circle"></i></i></button></td>
        </tr>`;
        }

        contenidoHTML += `</tbody>
</table>`;
    }
        else{
            contenidoHTML = Swal.fire({
                title: "No hay elementos en tu carrito",
                showClass: {
                  popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `
                },
                hideClass: {
                  popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `
                }
              });
        }


    document.getElementById("contenido").innerHTML = contenidoHTML;
}
renderCarrito();
