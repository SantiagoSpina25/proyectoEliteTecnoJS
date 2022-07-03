

// Dark mode

let theme=localStorage.getItem("theme") || "light"


let botonDarkMode = document.getElementById("botonDarkMode")
botonDarkMode.addEventListener("click", activarDarkMode)
document.body.className=theme;

if (document.getElementById("tabla") != null){
  theme == "light" ? document.getElementById("tabla").className="table" : document.getElementById("tabla").className="table table-light"
}


localStorage.setItem("theme", theme)

function activarDarkMode(){
  
  if(theme == "light"){
    
    theme = "dark";
    document.body.className="dark";
    if (document.getElementById("tabla") != null){
      document.getElementById("tabla").className="table table-light";
    }
    botonDarkMode.innerText = "Light mode"
    
  }else{
    
    theme = "light";
    document.body.className="light";
    if (document.getElementById("tabla") != null){
      document.getElementById("tabla").className="table";
    }
    botonDarkMode.innerText = "Dark mode"
    
  }
  
  localStorage.setItem("theme",theme)
}



AOS.init();