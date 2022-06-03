

let carrito = []
let tablaProductos = document.getElementById("tablaProductos");

// if(localStorage.getItem("carrito")){
//   carrito = JSON.parse(localStorage.getItem("carrito"))

//   for(const productoEnCarrito of carrito){
//     tablaProductos.innerHTML += `
//     <tr>
//       <td>${productoNuevo.id}</td>
//       <td>${productoNuevo.modelo}</td>
//       <td>$${productoNuevo.precio}</td>
//     </tr>`
//   }

// }
// else{
//   carrito = []
// }



// Dark mode

let theme=localStorage.getItem("theme") || "light"

console.log(theme)

let botonDarkMode = document.getElementById("botonDarkMode")
botonDarkMode.addEventListener("click", activarDarkMode)
document.body.className=theme;

localStorage.setItem("theme", theme)

function activarDarkMode(){

  if(theme == "light"){

    theme = "dark";
    document.body.className="dark";
    document.getElementById("tabla").className="table table-light";
    botonDarkMode.innerText = "Light mode"

  }else{

    theme = "light";
    document.body.className="light";
    document.getElementById("tabla").className="table table-dark";
    botonDarkMode.innerText = "Dark mode"

  }

  localStorage.setItem("theme",theme)

  

}


//Funcion para desplegar las cards dinamicamente:

let contenedorCards = document.getElementById("contenedorCards");
 
function imprimirProductos(){

  for (const procesador of procesadores){
    let card = document.createElement("div");

    card.innerHTML = `
    <div class="card">
      <img src="${procesador.img}">
      <h4>${procesador.marca} ${procesador.modelo}</h4>
      <h5>${procesador.frecuencia}</h5>
      <p>$${procesador.precio}</p>
      <a href="#" id="btnAgregar${procesador.id}">Añadir</a>
    </div>
    `;

    contenedorCards.appendChild(card);
  }

  procesadores.forEach(procesador => {
    document.getElementById(`btnAgregar${procesador.id}`).addEventListener("click", () => agregarProducto(procesador))
  });

}

imprimirProductos();


//Funcion para pushear productos al carrito y mostrarlos en pantalla 

function agregarProducto(productoNuevo){
  carrito.push(productoNuevo)
  console.table(carrito)

  tablaProductos.innerHTML += `
  <tr>
    <td>${productoNuevo.id}</td>
    <td>${productoNuevo.modelo}</td>
    <td>$${productoNuevo.precio}</td>
  </tr>`

  localStorage.setItem("carrito", JSON.stringify(carrito))
}








//Funcion para obtener el precio total de la compra
            
// function obtenerPrecioTotal() {

//   for (const productoEnCarrito of carrito) {
//     precioTotal += productoEnCarrito.precio;
//   }
              
//   return precioTotal;  
// }

// obtenerPrecioTotal()

              

             

// class Procesador {
//   constructor(procesador) {
//     this.id = procesador.id
//     this.modelo  = procesador.modelo;
//     this.precio  = procesador.precio;
//     this.marca = procesador.marca;
//     this.cantidad = 1;
//     this.precioTotal = procesador.precio;
      
//   }

//   agregarUnidad(){
//     this.cantidad ++;
//   }

//   actualizarPrecioTotal() {
//     this.precioTotal = this.precio * this.cantidad;
//   }


// }