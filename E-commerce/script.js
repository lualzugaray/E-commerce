// Variables y constantes
let productosDisponibles = [
    { nombre: "Laptop", precio: 800 },
    { nombre: "Teclado mecánico", precio: 100 },
    { nombre: "Monitor de 27 pulgadas", precio: 250 },
];
let carrito = [];

// Función para mostrar productos
function mostrarProductos() {
    console.log("Productos Disponibles:");
    for (let i = 0; i < productosDisponibles.length; i++) {
        console.log(`${i + 1}. ${productosDisponibles[i].nombre} - $${productosDisponibles[i].precio}`);
    }
}

// Función para agregar productos al carrito
function agregarAlCarrito() {
    let seleccion = prompt("Ingrese el número del producto que desea agregar al carrito:");
    if (seleccion >= 1 && seleccion <= productosDisponibles.length) {
        carrito.push(productosDisponibles[seleccion - 1]);
        console.log(`${productosDisponibles[seleccion - 1].nombre} ha sido agregado al carrito.`);
        alert(`${productosDisponibles[seleccion - 1].nombre} ha sido agregado al carrito.`);
    } else {
        console.log("Selección inválida.");
        alert("Selección inválida.");
    }
}

// Función para eliminar productos al carrito
function eliminarDelCarrito() {
    let index = prompt("Ingrese el número del producto que desea eliminar del carrito:");
    if (index >= 1 && index <= carrito.length) {
        let productoEliminado = carrito.splice(index - 1, 1)[0];
        console.log(`${productoEliminado.nombre} ha sido eliminado del carrito.`);
        alert(`${productoEliminado.nombre} ha sido eliminado del carrito.`);
    } else {
        console.log("Selección inválida.");
        alert("Selección inválida.");
    }
}

// Función para vaciar el carrito
function vaciarCarrito() {
    carrito = [];
    console.log("El carrito ha sido vaciado.");
}

// Función para confirmar la compra
function confirmarCompra() {
    let total = 0;
    console.log("Carrito de Compras:");
    for (let i = 0; i < carrito.length; i++) {
        console.log(`${carrito[i].nombre} - $${carrito[i].precio}`);
        total += carrito[i].precio;
    }
    console.log(`Total de la compra: $${total}`);
    let confirmacion = confirm("¿Desea confirmar la compra?");
    if (confirmacion) {
        alert("Compra confirmada. Gracias por su compra.");
    } else {
        alert("Compra cancelada.");
    }
}