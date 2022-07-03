
let carrito =[];
let productosEnJson= [];
let precioTotalTxt = document.getElementById("precioTotalTxt")


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

  //Se agrega un evento en cada boton dinamicamente para agregar cada producto al carrito
  
  productosEnJson.forEach(procesador => {
    document.getElementById(`btnAgregar${procesador.id}`).addEventListener("click", function (e) {
      e.preventDefault()
      agregarProducto(procesador)
  
      swal({
        timer: 1000,
        title: "Producto agregado al carrito !",
        icon: "success"
      });
    })
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

}

// Completar compra

let botonCompletarCompra = document.getElementById("botonCompletarCompra")

botonCompletarCompra.onclick=()=>{

  if (localStorage.getItem("carrito")){
    // alert("Compra finalizada, Muchas gracias!");
    swal({
      title: "Compra finalizada!",
      text: `Muchas gracias! El precio final de la compra es: $${calcularTotal()}`,
      icon: "success",
    });
    carrito = []
    tablaProductos.innerHTML = ""
    precioTotalTxt.innerText = ""
    localStorage.removeItem("carrito")
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
  <tr id=fila${producto.id}>
    <td>${producto.id}</td>
    <td>${producto.modelo}</td>
    <td id= ${producto.id} >${producto.cantidad}</td>
    <td>$${producto.precio}</td>
    <td> <button class='btn btn-light' onclick='borrarProducto(${producto.id})'>❌</button>
  </tr>`
  precioTotalTxt.innerText=`Total de la compra: $ ${calcularTotal()}`;
}
}


//Funcion para pushear productos al carrito y mostrarlos en pantalla 

function agregarProducto(productoNuevo){

  let productoEncontrado = carrito.find(e => e.id == productoNuevo.id);

  if(productoEncontrado == undefined){
    let productoACarrito = new Procesadores(productoNuevo);
    carrito.push(productoACarrito);

    let tablaProductos = document.getElementById("tablaProductos");
  
    tablaProductos.innerHTML += `
    <tr id=fila${productoACarrito.id}>
      <td>${productoACarrito.id}</td>
      <td>${productoACarrito.modelo}</td>
      <td id= ${productoACarrito.id} >${productoACarrito.cantidad}</td>
      <td>$${productoACarrito.precio}</td>
      <td> <button class='btn btn-light' onclick='borrarProducto(${productoACarrito.id})'>❌</button>
    </tr>`
  }else{
    let pos = carrito.findIndex(e => e.id == productoNuevo.id);
    carrito[pos].cantidad += 1;

    document.getElementById(productoNuevo.id).innerHTML = carrito[pos].cantidad;    

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

//Funcion para ordenar los precios de los productos

function ordenarProductos(){

  let seleccionOrden = document.getElementById("seleccionOrden").value;
  console.log(seleccionOrden)
  
  if (seleccionOrden == "menor"){
    productosEnJson.sort(function(a, b) {
    return a.precio - b.precio
  });
  }
  else if (seleccionOrden == "mayor"){
  productosEnJson.sort(function(a,b){
    return b.precio - a.precio
  });
  }
  contenedorCards.innerHTML=""
  imprimirProductos()
}

document.getElementById("seleccionOrden").onchange=()=>ordenarProductos();



//Funcion para borrar productos individualmente del carrito

function borrarProducto(id){
  let indice=carrito.findIndex(prod => prod.id==id);
  carrito.splice(indice,1);
  localStorage.setItem("carrito", JSON.stringify(carrito))
  
  let fila=document.getElementById(`fila${id}`);
  document.getElementById("tablaProductos").removeChild(fila);
  document.getElementById("precioTotalTxt").innerText=`Total de la compra: $ ${calcularTotal()}`;
}
