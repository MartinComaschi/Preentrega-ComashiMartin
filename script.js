
const usuario = {
    nombre: '',
    apellido: '',
    edad: 0,
    muñecosComprados: [],
    totalPagar: 0,
};

const munecos = [
    { nombre: 'Muñeco 1', precio: 10000 },
    { nombre: 'Muñeco 2', precio: 11000 },
    { nombre: 'Muñeco 3', precio: 12000 },
    { nombre: 'Muñeco 4', precio: 13000 },
    { nombre: 'Muñeco 5', precio: 14000 },
    { nombre: 'Muñeco 6', precio: 15000 },
    { nombre: 'Muñeco 7', precio: 10000 },
    { nombre: 'Muñeco 8', precio: 11000 },
];

function mostrarCatalogo() {
    const catalogoDiv = document.getElementById('catalogo');
    catalogoDiv.innerHTML = '';

    munecos.forEach((muneco, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.textContent = `${index + 1}. ${muneco.nombre} - Precio: $${muneco.precio}`;
        catalogoDiv.appendChild(itemDiv);
    });
}

function iniciarSesion() {
    usuario.nombre = document.getElementById('nombre').value;
    usuario.apellido = document.getElementById('apellido').value;
    usuario.edad = parseInt(document.getElementById('edad').value);

    if (usuario.nombre === '' || usuario.apellido === '' || isNaN(usuario.edad)) {
        alert('Por favor, ingrese todos los datos correctamente.');
        return;
    }

    mostrarCatalogo();
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('tienda').style.display = 'block';
}

let cantidadMuñecosComprar = 0;

function empezarCompra() {
    cantidadMuñecosComprar = parseInt(prompt('Ingrese la cantidad de muñecos que desea comprar:'));
    if (isNaN(cantidadMuñecosComprar) || cantidadMuñecosComprar <= 0) {
        alert('La cantidad ingresada no es válida.');
        return;
    }

    comprar();
}

function comprar() {
    const cantidadComprados = usuario.muñecosComprados.length;
    if (cantidadComprados >= cantidadMuñecosComprar) {
        console.log(`Ha alcanzado la cantidad de ${cantidadMuñecosComprar} muñecos que deseaba comprar.`);
        mostrarMuñecosComprados();
        return;
    }

    const opcionCompra = parseInt(prompt(`Ingrese el número del muñeco que desea comprar (1 al 8), o ingrese 0 para salir (${cantidadComprados + 1} de ${cantidadMuñecosComprar}):`));

    if (opcionCompra >= 1 && opcionCompra <= munecos.length) {
        const munecoSeleccionado = munecos[opcionCompra - 1];
        usuario.muñecosComprados.push(munecoSeleccionado);
        usuario.totalPagar += munecoSeleccionado.precio;
        console.log(`Ha comprado el muñeco: ${munecoSeleccionado.nombre}`);
        comprar();
    } else if (opcionCompra === 0) {
        console.log('Ha salido de la tienda.');
    } else {
        alert('Opción inválida. Por favor, ingrese un número válido.');
        comprar();
    }
}

function mostrarMuñecosComprados() {
    const carritoItems = document.getElementById('carrito-items');
    const totalPagarSpan = document.getElementById('total-pagar');
    carritoItems.innerHTML = '';
    totalPagarSpan.textContent = ` ${usuario.totalPagar}`;

    usuario.muñecosComprados.forEach((muneco, index) => {
        const itemLi = document.createElement('li');
        itemLi.textContent = `${index + 1}. ${muneco.nombre} - Precio: $${muneco.precio}`;
        carritoItems.appendChild(itemLi);
    });

    document.getElementById('tienda').style.display = 'none';
    document.getElementById('carrito').style.display = 'block';
}

function iniciarPrograma() {
    document.getElementById('tienda').style.display = 'none';
    document.getElementById('carrito').style.display = 'none';
}

iniciarPrograma();