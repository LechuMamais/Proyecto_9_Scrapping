document.addEventListener("DOMContentLoaded", () => {
    crearHome();
});

let frases;
let puntaje = 0;
let fraseMostrada;

async function obtenerFrasesAleatorias(modo) {
    try {
        if (modo == "principales") {
            const response = await fetch("http://localhost:3000/api/v1/game/principales");
            frases = await response.json();
        }else if (modo == "todos") {
            const response = await fetch("http://localhost:3000/api/v1/game/principalesYSecundarios");
            frases = await response.json();
        }
        mostrarFraseAleatoria();
        mostrarBotones(modo)
        mostrarPuntaje();

    } catch (error) {
        console.error("Error al obtener frases aleatorias:", error);
    }
}

function crearHome() {
    const appDiv = document.getElementById("app");
    appDiv.innerHTML = `
        <div>
            <h1>Bienvenido al Juego de Frases de Los Simpsons!</h1>
            <button onclick="comenzarJuego('principales')">Comienza el juego (easy)</button>
            <button onclick="comenzarJuego('todos')">Para mas placer (hard)</button>
        </div>
    `;
}

function mostrarFraseAleatoria() {
    const indiceAleatorio = Math.floor(Math.random() * frases.length);
    const fraseSeleccionada = frases[indiceAleatorio];
    fraseMostrada = fraseSeleccionada;
    mostrarFrase(fraseSeleccionada);
}

function mostrarFrase(frase) {
    const appDiv = document.getElementById("app");
    appDiv.innerHTML = `
        <div>
            <p>"${frase.frase}"</p>
        </div>
    `;
    
}

function mostrarBotones(modo) {
    const appDiv = document.getElementById("app");
    const botonesDiv = document.createElement("div");
    botonesDiv.innerHTML = `
        <div>
            <h3>Quien la dijo?</h3>
            ${frases.map((objeto) => `
                <button onclick="manejarSeleccionFrase('${objeto.nombre}', '${modo}')">${objeto.nombre}</button>
            `).join('')}
        </div>
    `;
    appDiv.appendChild(botonesDiv);
}

function mostrarPuntaje() {
    const appDiv = document.getElementById("app");
    const puntajeDiv = document.createElement("div");
    puntajeDiv.innerHTML = `<h3>Puntaje: ${puntaje}</h3>`;

    // Eliminar cualquier puntaje anterior del DOM antes de mostrar el nuevo puntaje
    const puntajeAnterior = appDiv.querySelector("#puntaje");
    if (puntajeAnterior) {
        appDiv.removeChild(puntajeAnterior);
    }

    puntajeDiv.id = "puntaje";
    appDiv.appendChild(puntajeDiv);
}

function manejarSeleccionFrase(nombre, modo) {
    // Verificar si el nombre del botón coincide con el nombre de la frase mostrada
    if (nombre === fraseMostrada.nombre) {
        puntaje++;
        mostrarPuntaje();
    }
    // Pasar a la siguiente frase
    obtenerFrasesAleatorias(modo)
}

function comenzarJuego(modo) {
    obtenerFrasesAleatorias(modo);
}
