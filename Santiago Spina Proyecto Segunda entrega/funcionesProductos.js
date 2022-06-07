

let carrito;
let tablaProductos = document.getElementById("tablaProductos");


// Se pregunta si hay productos o en el carrito, si lo hay, se traen los productos del storage y se agregan a la tabla, de lo contrario se crea un array vacio


localStorage.getItem("carrito")!=null ? (carrito=JSON.parse(localStorage.getItem("carrito")),  actualizarTablaCarrito() ) : carrito=[];



//Funcion para desplegar las cards dinamicamente:

let contenedorCards = document.getElementById("contenedorCards");

function imprimirProductos(){
  
  for (const procesador of procesadores){
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
  
  procesadores.forEach(procesador => {
    document.getElementById(`btnAgregar${procesador.id}`).addEventListener("click", () => agregarProducto(procesador))
  });
  
}

imprimirProductos();




// Botones de vaciar carrito y completar compra

// Vaciar carrito

let botonVaciarCarrito = document.getElementById("botonVaciarCarrito")

botonVaciarCarrito.onclick=()=>{
  carrito = []
  tablaProductos.innerHTML = ""
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