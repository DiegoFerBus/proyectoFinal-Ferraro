function agregarProducto(id) {
  const producto = productos.find(item => item.id === id);
  const carrito = cargarCarritoLS();

  // Verificar si el producto ya está en el carrito
  const productoEnCarrito = carrito.find(item => item.id === id);
  if (productoEnCarrito) {
      productoEnCarrito.cantidad += 1;
  } else {
      producto.cantidad = 1;
      carrito.push(producto);
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderBotonCarrito();
}

function eliminarProducto(id) {
  let carrito = cargarCarritoLS();
  
  // Buscar el producto en el carrito
  const productoIndex = carrito.findIndex(item => item.id === id);
  
  if (productoIndex !== -1) {
      // Disminuir la cantidad del producto
      if (carrito[productoIndex].cantidad > 1) {
          carrito[productoIndex].cantidad -= 1;
      } else {

          carrito.splice(productoIndex, 1);
      }
  }
  
  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderCarrito();
  renderBotonCarrito();
}

function vaciarCarrito() {
  localStorage.removeItem("carrito");
  renderCarrito();
  renderBotonCarrito();
}

function renderCarrito() {
  let carrito = cargarCarritoLS();
  let contenidoHTML = '';

  if (carrito.length > 0) {
      // Agrupar productos y sumar las cantidades
      const productosEnCarrito = carrito.reduce((acc, producto) => {
          if (!acc[producto.id]) {
              acc[producto.id] = { ...producto, cantidad: 0 };
          }
          acc[producto.id].cantidad += producto.cantidad;
          return acc;
      }, {});

      contenidoHTML += '<table class="table"><tbody>';
      contenidoHTML += `<tr><td class="text-end" colspan="4"><button class="btn btn-danger" onclick="vaciarCarrito();">Vaciar carrito</button></td></tr>`;

      for (const id in productosEnCarrito) {
          const producto = productosEnCarrito[id];
          const precioTotal = producto.precio * producto.cantidad;
          contenidoHTML += `<tr>
              <td><img src="${producto.imagen}" alt="${producto.nombre}" width="90"></td>
              <td class="align-middle"><p class="text-dark"><strong>${producto.nombre} (${producto.cantidad})</strong></p></td>
              <td class="align-middle">$${precioTotal.toFixed(2)}</td>
              <td class="text-end align-middle"><button class="btn btn-outline-danger" onclick="eliminarProducto(${producto.id});">Eliminar <i class="bi bi-x-circle"></i></button></td>
          </tr>`;
      }

      contenidoHTML += `<tr>
          <td colspan="2"></td>
          <td class="text-center"><strong>Total a pagar:</strong></td>
          <td class="text-right">$${calcularTotalPagar().toFixed(2)}</td>
      </tr>`;
      contenidoHTML += `<tr>
          <td colspan="4" class="text-end">
              <button class="btn btn-success" onclick="finalizarCompra();">Finalizar compra</button>
          </td>
      </tr>`;
      contenidoHTML += '</tbody></table>';
  } else {
      contenidoHTML = `
          <div class="alert alert-warning" role="alert">
              No hay elementos en tu carrito.
          </div>`;
  }

  document.getElementById("contenido").innerHTML = contenidoHTML;
}

// Calcular el total a pagar
function calcularTotalPagar() {
  let carrito = cargarCarritoLS();
  const productosEnCarrito = carrito.reduce((acc, producto) => {
      if (!acc[producto.id]) {
          acc[producto.id] = { ...producto, cantidad: 0 };
      }
      acc[producto.id].cantidad += producto.cantidad;
      return acc;
  }, {});
  return Object.values(productosEnCarrito).reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
}

function cargarCarritoLS() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}

// Actualizar el total de productos en el carrito
function renderBotonCarrito() {
  const total = totalProductos();
  document.getElementById("totalCarrito").innerText = total;
}

// Función para calcular el total de productos en el carrito
function totalProductos() {
  let carrito = cargarCarritoLS();
  const productosEnCarrito = carrito.reduce((acc, producto) => {
      acc[producto.id] = (acc[producto.id] || 0) + producto.cantidad;
      return acc;
  }, {});
  return Object.values(productosEnCarrito).reduce((acc, cantidad) => acc + cantidad, 0);
}

function finalizarCompra() {
  const contenidoHTML = `
    <h2>Datos para el envío</h2>
    <form id="formEnvio">
      <div class="mb-3">
        <label for="nombre" class="form-label">Nombre y Apellido</label>
        <input type="text" class="form-control" id="nombre" required>
      </div>
      <div class="mb-3">
        <label for="direccion" class="form-label">Dirección</label>
        <input type="text" class="form-control" id="direccion" required>
      </div>
      <div class="mb-3">
        <label for="codigoPostal" class="form-label">Código Postal</label>
        <input type="text" class="form-control" id="codigoPostal" required>
      </div>
      <div class="mb-3">
        <label for="celular" class="form-label">Celular</label>
        <input type="text" class="form-control" id="celular" required>
      </div>
      <button type="submit" class="btn btn-success">Enviar</button>
    </form>
  `;

  document.getElementById("contenido").innerHTML = contenidoHTML;
  document.body.insertAdjacentHTML('beforeend', `
    <div id="spinner" style="display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 9999;">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `);

  document.getElementById("formEnvio").addEventListener("submit", function(event) {
    event.preventDefault();

    // Mostrar spinner
    document.getElementById("spinner").style.display = "block";

    const datosEnvio = {
      nombre: document.getElementById("nombre").value,
      direccion: document.getElementById("direccion").value,
      codigoPostal: document.getElementById("codigoPostal").value,
      celular: document.getElementById("celular").value
    };

    new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem("datosEnvio", JSON.stringify(datosEnvio));
        resolve();
      }, 5000); // Simula un retraso de 2 segundos
    }).then(() => {
      document.getElementById("spinner").style.display = "none";

      // Mostrar mensaje de éxito
      Swal.fire({
        title: 'Compra realizada con éxito',
        text: '¡Gracias por elegirnos!',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
      vaciarCarrito();

      // Eliminar spinner del DOM
      document.getElementById("spinner").remove();
    });
  });
}

renderCarrito(); 

