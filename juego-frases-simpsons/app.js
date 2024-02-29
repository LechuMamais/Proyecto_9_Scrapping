document.addEventListener("DOMContentLoaded", () => {
    crearHome();
});

let frases;
let puntaje = 0;
let fraseMostrada;

// Petición a nuestra API!
async function obtenerFrasesAleatorias(modo) {
    try {
        if (modo == "principales") {
            const response = await fetch("http://localhost:3000/api/v1/game/principales");
            frases = await response.json();
        } else if (modo == "todos") {
            const response = await fetch("http://localhost:3000/api/v1/game/principalesYSecundarios");
            frases = await response.json();
        }
    } catch (error) {
        console.error("Error al obtener frases aleatorias:", error);
    }
}

async function gameSecuence(modo) {
    try {
        await obtenerFrasesAleatorias(modo);
        borrarGameContainer()
        mostrarBackToHome()
        mostrarFraseAleatoria();
        mostrarBotones(modo)
        mostrarPuntaje();
    } catch (error) {
        console.error(error);
    }
}

function crearHome() {
    resetPuntaje(); // Vuelve el puntaje a 0
    borrarGameContainer(); // Si estabamos jugando, primero borrar todo lo pertinente al juego.
    const appDiv = document.getElementById("app");
    appDiv.innerHTML = `
        <div id="home-container">
            <h1>¡Juego de Frases de Los Simpsons!</h1>
            <button class="start-button button" onclick="comenzarJuego('principales')">Comienza el juego -- easy</button>
            <button class="start-button button" onclick="comenzarJuego('todos')">Para mas placer --- hard</button>
        </div>
    `;
}
function borrarHome() {
    // Si hay homeContainer, lo borramos.
    let homeContainer = document.querySelector("#home-container");
    if (homeContainer) {
        homeContainer.remove();
    }
}
function crearGameContainer() {
    const appDiv = document.getElementById("app");
    const gameContainerDiv = document.createElement("div");
    gameContainerDiv.id = "game-container";
    appDiv.appendChild(gameContainerDiv);
    mostrarBackToHome();
}
function borrarGameContainer() {
    // Si hay gameContainer, lo borramos.
    let gameContainer = document.querySelector("#game-container");
    if (gameContainer) {
        gameContainer.innerHTML = "";
    }
}
function resetPuntaje() {
    puntaje = 0
}

function mostrarFraseAleatoria() {
    const indiceAleatorio = Math.floor(Math.random() * frases.length);
    fraseMostrada = frases[indiceAleatorio];
    mostrarFrase(fraseMostrada);
}

function mostrarFrase(frase) {
    const gameContainer = document.querySelector("#game-container");
    gameContainer.innerHTML += `
        <div id="frase-container">
            <p>"${frase.frase}"</p>
        </div>
    `;
}

function mostrarBotones(modo) {
    const gameContainer = document.querySelector("#game-container");
    const botonesDiv = document.createElement("div");
    botonesDiv.id = "buttons-and-h3-container";
    botonesDiv.innerHTML = `
        
        <h3 id="quien-lo-dijo">Quien lo dijo... </h3>
        <div id="buttons-container">
            ${frases.map((objeto) => `
                <button class="select-frase-button button" onclick="manejarSeleccionFrase('${objeto.nombre}', '${modo}')">${objeto.nombre}</button>
            `).join('')}
        </div>
    `;
    gameContainer.appendChild(botonesDiv);
}
function mostrarBackToHome() {
    const appDiv = document.querySelector("#game-container");
    const backToHomeButton = document.createElement("div");
    backToHomeButton.innerHTML = `
        <button class="backToHome-button button" onclick="crearHome()">Volver</button>
    `;
    appDiv.prepend(backToHomeButton);
}

function mostrarPuntaje() {
    const gameContainer = document.querySelector("#game-container");
    const puntajeDiv = document.createElement("div");
    puntajeDiv.innerHTML = `<h3>Puntaje: ${puntaje}</h3>`;

    // Eliminar cualquier puntaje anterior del DOM antes de mostrar el nuevo puntaje
    const puntajeAnterior = gameContainer.querySelector("#puntaje");
    if (puntajeAnterior) {
        gameContainer.removeChild(puntajeAnterior);
    }

    puntajeDiv.id = "puntaje";
    gameContainer.appendChild(puntajeDiv);
}

function manejarSeleccionFrase(nombre, modo) {
    // Verificar si el nombre del botón coincide con el nombre de la frase mostrada
    if (nombre === fraseMostrada.nombre) {
        puntaje++;
        mostrarPuntaje();
    }
    // Pasar a la siguiente frase
    gameSecuence(modo)
}

function comenzarJuego(modo) {
    borrarHome()
    crearGameContainer()
    gameSecuence(modo);
}
