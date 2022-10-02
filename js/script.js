const urlPeliculas = "https://japceibal.github.io/japflix_api/movies-data.json";
let peliculasArray = [];
let empty = [];

function mostrarPeliculas(array){
    let mostrar = "";

    for (let pelicula of array){
        mostrar += `
        <div onclick="offCanvas(${pelicula.id})" class= "card p-3 bg-dark col-md-4 w-auto h-auto list-group-item color" role="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">
                <h5>${pelicula.title}</h5> <p class="icons position-absolute top-0 mt-3 end-0 me-4">${puntuacion(Math.round(pelicula.vote_average)/1.6)}</p>
                <i class="text-muted">${pelicula.tagline}</i>
        </div>
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

    let buscado = " " + document.getElementById("inputBuscar").value;

    let listafiltrada = peliculasArray.filter(pelicula => {
    
        tituloBuscar = pelicula.title.toLowerCase().indexOf(buscado.toLowerCase()) > -1;
        overviewBuscar = pelicula.overview.toLowerCase().indexOf(buscado.toLowerCase()) > -1;
        taglineBuscar = pelicula.tagline.toLowerCase().indexOf(buscado.toLowerCase()) > -1;
        generosBuscar = (generos(pelicula.genres)).toLowerCase().indexOf(buscado.toLowerCase()) > -1;

    return (tituloBuscar) || (overviewBuscar) || (taglineBuscar) || (generosBuscar)})
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
function offCanvas(id) {

    let mostrar = "";
    let pelicula = peliculasArray.find(movie => movie.id == id);

    mostrar = `
       <li><a class="dropdown-item" href="#">
        Year: ${(pelicula.release_date).split('-')[0]}</a>
      </li>
      <li><a class="dropdown-item" href="#">
        RunTime: ${pelicula.runtime} minutes </a>
      </li>
      <li><a class="dropdown-item" href="#"> 
        Budget: ${pelicula.budget} </a>
      </li>
      <li><a class="dropdown-item" href="#">
      Revenue: $${pelicula.revenue} </a>
       </li>
    `

    document.getElementById('titulo').innerHTML = pelicula.title;
    document.getElementById('descripcion').innerHTML = pelicula.overview;
    document.getElementById('generos').innerHTML = generos(pelicula.genres);
    document.getElementById('info').innerHTML = mostrar;
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

        let textoEscrito = document.getElementById("inputBuscar").value;

        if(textoEscrito == ""){
            mostrarPeliculas(empty);
        }else {
            buscador();
        }
    });
});
