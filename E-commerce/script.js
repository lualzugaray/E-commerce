let productosDisponibles = [
    { nombre: "Mouse Logitech G203 Lightsync", precio: 29, imagen: "img/logitechG203.jpg" },
    { nombre: "Monitor Hikvision 27″", precio: 1049, imagen: "img/monitorHikvision.jpg" },
    { nombre: "Notebook Gamer MSI GF63 Thin", precio: 250, imagen: "img/msiNotebook.jpg" },
];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function verificarSesion() {
    const usuarioLogeado = sessionStorage.getItem("usuarioLogeado");

    if (!usuarioLogeado) {
        // Si el usuario no ha iniciado sesión, puedes redirigir al inicio de sesión
        // window.location.href = "login.html";

        // O simplemente permitir que el usuario continúe sin iniciar sesión
        console.log("Usuario no ha iniciado sesión, permitiendo acceso.");
    }
}


function mostrarProductos() {
    let productosDiv = document.getElementById("productos");
    productosDiv.innerHTML = "";

    for (let i = 0; i < productosDisponibles.length; i++) {
        let producto = productosDisponibles[i];

        let productoHTML = document.createElement("div");
        productoHTML.className = "col-md-4 mb-4";
        productoHTML.innerHTML = `
            <div class="card">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-price">Precio: $${producto.precio}</p>
                    </div>
                    <button onclick="agregarAlCarrito(${i})" class="btn btn">Agregar al Carrito</button>
                </div>
            </div>
        `;
        productosDiv.appendChild(productoHTML);
    }
}

function actualizarCarrito() {
    let carritoButton = document.getElementById("carritoButton");
    carritoButton.textContent = `Ver Carrito (${carrito.length})`;
}

function mostrarCarrito() {
    let carritoDiv = document.getElementById("carritoContenido");
    carritoDiv.innerHTML = "<h3>Carrito de Compras</h3>";

    if (carrito.length === 0) {
        carritoDiv.innerHTML += "<p>El carrito está vacío.</p>";
    } else {
        let tabla = document.createElement("table");
        tabla.className = "table";

        let encabezado = tabla.createTHead();
        let filaEncabezado = encabezado.insertRow();
        let nombresColumnas = ["Nombre", "Imagen", "Precio", "Eliminar"];
        for (let nombreColumna of nombresColumnas) {
            let th = document.createElement("th");
            th.textContent = nombreColumna;
            filaEncabezado.appendChild(th);
        }

        let cuerpoTabla = tabla.createTBody();

        for (let i = 0; i < carrito.length; i++) {
            let producto = carrito[i];

            let fila = cuerpoTabla.insertRow();

            let celdaNombre = fila.insertCell();
            celdaNombre.textContent = producto.nombre;

            let celdaImagen = fila.insertCell();
            let imagen = document.createElement("img");
            imagen.src = producto.imagen;
            imagen.alt = producto.nombre;
            imagen.style.maxHeight = "100px";
            imagen.style.width = "auto";
            celdaImagen.appendChild(imagen);

            let celdaPrecio = fila.insertCell();
            celdaPrecio.textContent = `$${producto.precio}`;

            let celdaEliminar = fila.insertCell();
            let botonEliminar = document.createElement("button");
            botonEliminar.textContent = "Eliminar";
            botonEliminar.className = "btn btn";
            botonEliminar.onclick = function () {
                eliminarDelCarrito(i);
            };
            celdaEliminar.appendChild(botonEliminar);
        }

        carritoDiv.appendChild(tabla);

        let totalDiv = document.createElement("div");
        let total = carrito.reduce((sum, producto) => sum + producto.precio, 0);
        totalDiv.textContent = `Total de la compra: $${total}`;
        carritoDiv.appendChild(totalDiv);

        let confirmarCompraButton = document.createElement("button");
        confirmarCompraButton.textContent = "Confirmar Compra";
        confirmarCompraButton.className = "btn btn";
        confirmarCompraButton.onclick = confirmarCompra;
        carritoDiv.appendChild(confirmarCompraButton);
    }
}

function agregarAlCarrito(index) {
    carrito.push(productosDisponibles[index]);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
    mostrarCarrito();
}

function vaciarCarrito() {
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
    actualizarCarrito();
}

function confirmarCompra() {
    Swal.fire({
        icon: 'success',
        title: 'Compra confirmada',
        text: '¡Gracias por tu compra!',
    }).then(() => {
        vaciarCarrito();
    });
}

document.addEventListener('DOMContentLoaded', function () {
    verificarSesion();
    mostrarProductos();
});
