const urlPeliculas = "https://japceibal.github.io/japflix_api/movies-data.json";
peliculasArray = [];

function mostrarPeliculas(array){
    let mostrar = "";

    for (let pelicula of array){
        mostrar += `
            <div id="canvas" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">   
                <li>${pelicula.title}</li>
                <p>${pelicula.tagline}</p>
                <span>${puntuacion(Math.round(pelicula.vote_average)/2)}</span>
                <span> ${generos(pelicula.genres)}</span>
            </div>
            <br>
        `
    }
    document.getElementById('lista').innerHTML = mostrar;
}
function puntuacion(array){
    let estrellas ="";
    
    for (let i = 1; i <= 5; i++){
        if(i <= array){
            estrellas += `<i class="fa fa-star checked"></i>`;
            
        }else {
            estrellas += `<i class="fa fa-star"></i>`;
        } 
    }
    return estrellas;
}

function buscador(){
    let textoEscrito = document.getElementById("inputBuscar").value;
    
    let listafiltrada = peliculasArray.filter(pelicula => {
    return (pelicula.title.toLowerCase().indexOf(textoEscrito.toLowerCase()) > -1 )||
    (pelicula.overview.toLowerCase().indexOf(textoEscrito.toLowerCase()) > -1 )||
    (pelicula.tagline.toLowerCase().indexOf(textoEscrito.toLowerCase()) > -1) ;})
    mostrarPeliculas(listafiltrada);
}

function generos(array){
    let nombres = "";
    for(let genero of array){
        nombres += `
        ${genero.name};
        `
    }
    return nombres;
}

let obtenerJson = function(url){
    var result = {};
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        return result;
    });
}
document.addEventListener("DOMContentLoaded", function(){
    obtenerJson(urlPeliculas).then(function(resultObj){
        
        if (resultObj.status === "ok")
        {
            peliculasArray = resultObj.data;

        }
    });
    document.getElementById('btnBuscar').addEventListener('click',()=>{
     
        buscador();
    });
});
