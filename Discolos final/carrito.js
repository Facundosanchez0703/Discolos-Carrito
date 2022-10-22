let arrayCarrito =[]
    if(arrayCarrito = JSON.parse(localStorage.getItem('Carrito'))== null){
        arrayCarrito = []
    }else{
        arrayCarrito = JSON.parse(localStorage.getItem('Carrito'))
    }

function pintarDatos(arrayCarrito){
    let contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = ""
    let total = 0;
    let acumulador = 0;
    if(arrayCarrito.length > 0){
        arrayCarrito.map(elemento => {
            acumulador = elemento.precio * elemento.cantidad;
            total = total + acumulador;
            contenedor.innerHTML += 
            `
            <li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
                <div class="fw-bold">${elemento.artista} - ${elemento.album}</div>
            <span class="card text-start border border-0">Unidades: ${elemento.cantidad}</span> 
            </div>
            <span class="badge bg-primary rounded-pill">${acumulador}</span>
            <span class="badge bg-danger ms-1 rounded-pill btn-borrar" data-id=${elemento.id}>x</span>
        </li>
            `
        }
        )

        contenedor.innerHTML +=
        `
        <ul class="list-group">
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <div class="fw-bold">TOTAL:</div>
        <span class="badge bg-success rounded-pill">$${total}</span>
        </li>
    </ul>
        `
    }else{
        contenedor.innerHTML = ` <h5 class="h1-resultados">El carrito está vacío</h5>`
    }

    btnBorrar(arrayCarrito)
    
}

pintarDatos(arrayCarrito)

function btnBorrar(arrayCarrito){
    let btnBorrar = document.querySelectorAll(".btn-borrar")
    for (const btn of btnBorrar) {
        btn.addEventListener("click", (evento) => {
            console.log("click")
            let id = evento.target.dataset.id;
            let resultado = arrayCarrito.find(elemento => elemento.id == id)
            console.log(resultado)
            let posicion = arrayCarrito.indexOf(resultado)
            arrayCarrito.splice(posicion, 1);
            localStorage.setItem("Carrito", JSON.stringify(arrayCarrito))
            pintarDatos(arrayCarrito)
        })}
}

function btnCerrar(arrayCarrito){
    let btnCerrar = document.querySelectorAll(".cerrar")
    for (const btn of btnCerrar) {
        btn.addEventListener("click", (evento) => {
            localStorage.removeItem("Carrito")
            pintarDatos(arrayCarrito)
            location.reload()
        })
        
    }
}

btnCerrar(arrayCarrito)

function carritoVacio(arrayCarrito){
    let btnConfirmar = document.getElementById("confirmar");
    if(arrayCarrito.length == 0){
        btnConfirmar.style.display = "none"
    }
}

carritoVacio(arrayCarrito)
