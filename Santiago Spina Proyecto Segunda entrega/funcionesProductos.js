
let carrito;
let productosEnJson= [];


class Procesadores {
  constructor(procesador){
    this.id = procesador.id;
    this.img = procesador.img;
    this.modelo= procesador.modelo;
    this.marca= procesador.marca
    this.precio= procesador.precio
    this.cantidad = 1;
  }
}



// Se pregunta si hay productos o no en el carrito, si los hay, se traen los productos del storage y se agregan a la tabla, de lo contrario se crea un array vacio


localStorage.getItem("carrito")!=null ? (carrito=JSON.parse(localStorage.getItem("carrito")),  actualizarTablaCarrito() ) : carrito=[];



//Funcion para desplegar las cards dinamicamente:

let contenedorCards = document.getElementById("contenedorCards");

function imprimirProductos(){
  
  for (const procesador of productosEnJson){
    let card = document.createElement("div");
    
    card.innerHTML += `
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
  
  productosEnJson.forEach(procesador => {
    document.getElementById(`btnAgregar${procesador.id}`).addEventListener("click", () => agregarProducto(procesador))
  });
  
}




// Botones de vaciar carrito y completar compra

// Vaciar carrito

let botonVaciarCarrito = document.getElementById("botonVaciarCarrito")

botonVaciarCarrito.onclick=()=>{
  carrito = []
  tablaProductos.innerHTML = ""
  precioTotalTxt.innerText = ""
  localStorage.removeItem("carrito")
  console.clear()

}

// Completar compra

let botonCompletarCompra = document.getElementById("botonCompletarCompra")

botonCompletarCompra.onclick=()=>{

  if (localStorage.getItem("carrito")){
    // alert("Compra finalizada, Muchas gracias!");
    swal({
      title: "Compra finalizada!",
      text: "Muchas gracias!",
      icon: "success",
    });
    carrito = []
    tablaProductos.innerHTML = ""
    precioTotalTxt.innerText = ""
    localStorage.removeItem("carrito")
    console.clear()
  }
  else{
    // alert("No hay productos en el carrito!")
    swal({
      title: "No hay productos en el carrito!",
      text: "Intentalo de nuevo",
      icon: "error",
    });
    
  }  
}




//Funcion para agregar productos del storage a la tabla

function actualizarTablaCarrito(){

for(const producto of carrito){
  tablaProductos.innerHTML += `
  <tr>
    <td>${producto.id}</td>
    <td>${producto.modelo}</td>
    <td>$${producto.precio}</td>
  </tr>`
}


}

let precioTotalTxt = document.getElementById("precioTotalTxt")

//Funcion para pushear productos al carrito y mostrarlos en pantalla 

function agregarProducto(productoNuevo){

  let productoEncontrado = carrito.find(e => e.id == productoNuevo.id);

  if(productoEncontrado == undefined){
    let productoACarrito = new Procesadores(productoNuevo);
    carrito.push(productoACarrito);

    let tablaProductos = document.getElementById("tablaProductos");
  
    tablaProductos.innerHTML += `
    <tr>
      <td>${productoACarrito.id}</td>
      <td>${productoACarrito.modelo}</td>
      <td>${productoACarrito.cantidad}
      <td>$${productoACarrito.precio}</td>
    </tr>`
  }else{
    let pos = carrito.findIndex(e => e.id == productoNuevo.id);
    carrito[pos].cantidad ++;

  }

  precioTotalTxt.innerText=`Total de la compra: $ ${calcularTotal()}`;
  
  localStorage.setItem("carrito", JSON.stringify(carrito))
}


//Funcion para obtener la informacion de los productos en productos.json

async function obtenerJSON() {
  const resp= await fetch("../productos.json")
  const data= await resp.json()
  productosEnJson = data;
  imprimirProductos();
}

obtenerJSON();


//Funcion para calcular el total

function calcularTotal() {

    let suma = 0;
    for (const producto of carrito) {
        suma = suma + (producto.precio * producto.cantidad);
    }
    return suma;
}