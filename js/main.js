const productos = [
    { id: 1, nombre: "Fernet Branca", precio: 800, imagen: "https://media.danmurphys.com.au/dmo/product/908733-1.png", categoria: "con alcohol" },
    { id: 2, nombre: "Coca Cola 1.25L", precio: 120, imagen: "https://media.danmurphys.com.au/dmo/product/32731-1.png", categoria: "sin alcohol" },
    { id: 3, nombre: "Whisky Jack Daniels", precio: 1790, imagen: "https://www.distribuidorabebidas.com.uy/wp-content/uploads/sites/31/2019/09/73587-1.png", categoria: "con alcohol" },
    { id: 4, nombre: "Energizante Prime", precio: 150, imagen: "https://i.pinimg.com/736x/28/f6/c3/28f6c3a74c06957161300e84e3662003.jpg", categoria: "con alcohol" },
    { id: 5, nombre: "Ron Habanero", precio: 1080, imagen: "https://media.danmurphys.com.au/dmo/product/1000004770-1573800-1.png", categoria: "con alcohol" },
    { id: 6, nombre: "Vino Gran Maestro", precio: 348, imagen: "https://discostarica.com/wp-content/uploads/2021/03/1000004933-CIGMPR750ML-1.png", categoria: "con alcohol" },
    { id: 7, nombre: "Martini Bianco", precio: 579, imagen: "https://media.danmurphys.com.au/dmo/product/43123-1.png", categoria: "con alcohol" },
    { id: 8, nombre: "Energizante Speed", precio: 90, imagen: "https://i.pinimg.com/736x/30/7a/4f/307a4f520619daf87c9c7b1295c1d07d.jpg", categoria: "sin alcohol" },
    { id: 9, nombre: "Campari Bitter", precio: 110, imagen: "https://i.pinimg.com/originals/51/03/ec/5103ecf811b7437aadcb4d1ae4b45188.png", categoria: "con alcohol" },
    { id: 10, nombre: "The Botanist", precio: 980, imagen: "https://media.danmurphys.com.au/dmo/product/746531-1.png", categoria: "con alcohol" },
    { id: 11, nombre: "Cerveza Holandia", precio: 58, imagen: "https://madiicr.com/wp-content/uploads/2023/01/367804-1.png", categoria: "con alcohol" },
    { id: 12, nombre: "Cerveza Corona", precio: 42, imagen: "https://www.comercialplaza.somosfactuel.pe/assets/uploads/3368f6a28dd96bce42d8a8385fc784bd.png", categoria: "con alcohol" },
    { id: 13, nombre: "Dr. Pepper 356ml", precio: 56, imagen: "https://i.pinimg.com/736x/7d/7b/ec/7d7becdc31bd22c331416716fea80e44.jpg", categoria: "sin alcohol" },
    { id: 14, nombre: "Pepsi Black 350ml", precio: 40, imagen: "https://i.pinimg.com/736x/97/06/f3/9706f3ddec89591e7fceb43eaa8c853b.jpg", categoria: "sin alcohol" },
    { id: 15, nombre: "Jagermeister 700ml", precio: 816, imagen: "https://i.pinimg.com/736x/c9/2c/2f/c92c2f023695e9c188ddf09be9b81f14.jpg", categoria: "con alcohol" },
    { id: 16, nombre: "Monster 250ml", precio: 72, imagen: "https://i.pinimg.com/736x/14/d6/fd/14d6fd3668c30a91bef9bee6cc1e81c4.jpg", categoria: "sin alcohol" },
];

function renderProductos(productos) {
    const productosContainer = document.getElementById('contenido');
    productosContainer.innerHTML = '';

    productos.forEach(producto => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'col-md-3';
        cardDiv.innerHTML = `
            <div class="card">
                <a href="producto.html" onclick="verProducto(${producto.id});">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                </a>
                <div class="card-body">
                    <p class="card-text"><strong>${producto.nombre}</strong><br>$${producto.precio}</p>
                    <p class="card-text text-center">
                        <button class="btn btn-success" onclick="agregarProducto(${producto.id});">Añadir al carrito</button>
                    </p>
                </div>
            </div>
        `;
        productosContainer.appendChild(cardDiv);
    });
}

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
    carrito = carrito.filter(producto => producto.id !== id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderCarrito();
    renderBotonCarrito();
}

function renderBotonCarrito() {
    let total = totalProductos();
    document.getElementById("totalCarrito").innerHTML = total;
}

function totalProductos() {
    const carrito = cargarCarritoLS();
    return carrito.reduce((total, producto) => total + producto.cantidad, 0);
}

function cargarCarritoLS() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

function vaciarCarrito() {
    localStorage.removeItem("carrito");
    renderCarrito();
    renderBotonCarrito();
}

function renderCarrito() {
    const carrito = cargarCarritoLS();
    let contenidoHTML = '<table class="table"><tbody>';

    contenidoHTML += `<tr>
            <td><button class="btn btn-danger" onclick="vaciarCarrito()">Vaciar carrito <i class="bi bi-trash3"></i></button></td>
        </tr>`;

    // Agrupar productos y sumar las cantidades
    const productosEnCarrito = carrito.reduce((acc, producto) => {
        if (!acc[producto.id]) {
            acc[producto.id] = { ...producto, cantidad: 0 };
        }
        acc[producto.id].cantidad += 1;
        return acc;
    }, {});

    for (const id in productosEnCarrito) {
        const producto = productosEnCarrito[id];
        const precioTotal = producto.precio * producto.cantidad;
        contenidoHTML += `<tr>
                <td><img src="${producto.imagen}" alt="${producto.nombre}" width="90"></td>
                <td class="align-middle"><p class="text-dark"><strong>${producto.nombre} (${producto.cantidad})</strong></p></td>
                <td class="align-middle">$${precioTotal}</td>
                <td class="text-end align-middle"><button class="btn btn-danger" onclick="eliminarProducto(${producto.id});">Eliminar <i class="bi bi-trash3"></i></button></td>
            </tr>`;
    }

    contenidoHTML += `</tbody>
    </table>`;

    document.getElementById("contenido").innerHTML = contenidoHTML;
}

renderProductos(productos);
renderBotonCarrito();
