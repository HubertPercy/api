const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');
const temperatura = document.querySelector('#temperatura');
const contenedor = document.querySelector('#contenido');
document.addEventListener('DOMContentLoaded',()=>{
    formulario.addEventListener('submit',darClick);
})
function darClick(e){
    e.preventDefault();
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;
    if(ciudad === '' || pais === ''){
        mensajeError('Relleno todos los campos');
        return;
    }
    llamarAPI(ciudad,pais);
}

function mensajeError(mensaje){
    const alerta = document.createElement('div');
    alerta.classList.add('alert','alert-danger','text-center');
    alerta.textContent = mensaje;
    resultado.appendChild(alerta);
    setTimeout(() => {
        alerta.remove();
    }, 3000);
}

function llamarAPI(ciudad,pais){
    const appAPI = '01ad7a22e82140494d4b573761488a49';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appAPI}`;
    fetch(url)
        .then(resultado => resultado.json())
        .then(datos => {
            limpiarHTML();
            console.log(datos);
            if(datos.cod === '404'){
                mensajeError('La ciudad no es la correcta');
                return;
            }
            gradosCentigrados(datos);
        })
}

function gradosCentigrados(datos){
    const {name,main:{temp,temp_max,temp_min}} = datos;

    const nombreDelPais = document.createElement('h2');
    nombreDelPais.textContent = `El Pais : ${name}`

    const nuevaTemp = kelvinaGrados(temp);
    const nuevaTempMax = kelvinaGrados(temp_max);
    const nuevaTempMin = kelvinaGrados(temp_min);

    const tempera = document.createElement('h2');
    tempera.innerHTML = `Temperatura : ${nuevaTemp} &#8451`;

    const temperaMax = document.createElement('h2');
    temperaMax.innerHTML = `Temperatura MAX : ${nuevaTempMax} &#8451`;

    const temperaMin = document.createElement('h2');
    temperaMin.innerHTML = `Temperatura MIN : ${nuevaTempMin} &#8451`;
    
    temperatura.appendChild(nombreDelPais);
    temperatura.appendChild(tempera);
    temperatura.appendChild(temperaMax);
    temperatura.appendChild(temperaMin);
    
    
    
}

const kelvinaGrados = grados => parseInt(grados-273.15);

function limpiarHTML(){
    while(temperatura.firstChild){
        temperatura.removeChild(temperatura.firstChild);
    }
}




