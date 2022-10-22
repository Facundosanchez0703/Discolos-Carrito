let arrayCarrito = []
    if(arrayCarrito = JSON.parse(localStorage.getItem('Carrito'))== null){
        arrayCarrito = []
    }else{
        arrayCarrito = JSON.parse(localStorage.getItem('Carrito'))
    }


async function traerDatos() {
    try {
        let respuesta = await fetch("./listado.json");
        let datos = await respuesta.json();
        return datos;
        
    } catch (error) {
        console.log(error)
        
    }
}

traerDatos().then((datos) => {
    pintarDatos(datos), 
    buscador(datos),
    genero(datos)
    estado(datos)
    origen(datos)
    formato(datos)
})

function pintarDatos(datos){
    let contenedor = document.getElementById("listado");
    contenedor.innerHTML = ""
    if(datos.length > 0){
        datos.map(elemento => {
            contenedor.innerHTML += 
            `
            <div class="card" id="card">
            <div class="card-top">
                <img class="portada" src="${elemento.portada}" alt="${elemento.album}">
            </div>
            <div class="card-bot">
                <div class="info">
                    <h5>${elemento.artista} - ${elemento.album}</h5>
                </div>
                <div class="precio">
                <h6>$${elemento.precio}
                </h6>
                </div>
            </div>
            <div class="carrito">
                <button data-id=${elemento.id} type="button" class="btn btn-success">Comprar</button>
            </div>
        </div>
            `
        }
        )
    }else{
        contenedor.innerHTML = ` <h1 class="h1-resultados">NO SE ENCONTRARON RESULTADOS</h1>`
    }

    btnCompra(datos)
    
}


function btnCompra(datos){
    let btnCompra = document.querySelectorAll(".btn-success")
    for (const elemento of btnCompra) {
        elemento.addEventListener("click", (evento)=>{
            let arrayCarrito =[]
            if(arrayCarrito = JSON.parse(localStorage.getItem('Carrito'))== null){
        arrayCarrito = []
            }else{
        arrayCarrito = JSON.parse(localStorage.getItem('Carrito'))
    }
            let id = evento.target.dataset.id
            let object = datos.find(elemento => elemento.id == id)
            if(!object.cantidad){
                object.cantidad = 1
            }
            let encontrar = arrayCarrito.find(elemento => elemento.id == id)
            //console.log(encontrar);
            if(encontrar){
                encontrar.cantidad ++
                console.log(arrayCarrito);
            }else{
                arrayCarrito.push(object)
            }

            localStorage.setItem('Carrito', JSON.stringify(arrayCarrito))
        })
        
    }
}

function buscador(arrayDatos){
    let textoBusqueda = document.getElementById("texto-busqueda");

    textoBusqueda.addEventListener("input", (evento) => {
        let filtro = evento.target.value.toLowerCase();
        let resultado = arrayDatos.filter(el => el.album.toLowerCase().includes(filtro) || el.artista.toLowerCase().includes(filtro))
        pintarDatos(resultado)
        

    }) 
}

function formato(datos) {
    let btnFormato = document.querySelectorAll(".formato")

    for (const btn of btnFormato) {
        btn.addEventListener("click", (evento)=>{
            let formato = evento.target.dataset.formato.toLowerCase()
            let resultado = datos.filter(el => el.formato.toLowerCase().includes(formato))
            pintarDatos(resultado)
        })
    }

}

function origen(datos) {
    let btnOrigen = document.querySelectorAll(".origen")

    for (const btn of btnOrigen) {

        btn.addEventListener("click", (evento)=>{
            let origen = evento.target.dataset.origen.toLowerCase()
            let resultado = datos.filter(el => el.origen.toLowerCase().includes(origen))
            pintarDatos(resultado)
        })
    }

}

function estado(datos) {
    let btnEstado = document.querySelectorAll(".estado")

    for (const btn of btnEstado) {
        btn.addEventListener("click", (evento)=>{
            let estado = evento.target.dataset.estado.toLowerCase()
            let resultado = datos.filter(el => el.estado.toLowerCase().includes(estado))
            pintarDatos(resultado)
        })
    }

}

function genero(datos) {
    let btnGenero = document.querySelectorAll(".genero")

    for (const btn of btnGenero) {
        btn.addEventListener("click", (evento)=>{
            let genero = evento.target.dataset.genero.toLowerCase()
            let resultado = datos.filter(el => el.genero.toLowerCase().includes(genero))
            pintarDatos(resultado)
        })
    }

}