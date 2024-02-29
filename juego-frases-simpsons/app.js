document.addEventListener("DOMContentLoaded", () => {
    crearHome();
});

let frases;
let puntaje = 0;
let fraseMostrada;

async function obtenerFrasesAleatorias() {
    try {
        const response = await fetch("http://localhost:3000/api/v1/game/principales");
        frases = await response.json();
        mostrarFraseAleatoria();
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
            <button onclick="comenzarJuego()">Comienza el juego</button>
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
    mostrarBotones()
}

function mostrarBotones() {
    const appDiv = document.getElementById("app");
    const botonesDiv = document.createElement("div");
    botonesDiv.innerHTML = `
        <div>
            <h3>Quien la dijo?</h3>
            ${frases.map((objeto, index) => `
                <button onclick="manejarSeleccionFrase('${objeto.nombre}')">${objeto.nombre}</button>
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

function manejarSeleccionFrase(nombre) {
    // Verificar si el nombre del botón coincide con el nombre de la frase mostrada
    if (nombre === fraseMostrada.nombre) {
        puntaje++;
        mostrarPuntaje();
    }
    // Pasar a la siguiente frase
    obtenerFrasesAleatorias()
}

function comenzarJuego() {
    obtenerFrasesAleatorias();
}
