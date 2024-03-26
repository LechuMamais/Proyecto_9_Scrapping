document.addEventListener("DOMContentLoaded", () => {
    crearHome();
});

let frases;
let puntaje = 0;
let vidas;
let fraseMostrada;

// Petición a nuestra API!
async function obtenerFrasesAleatorias(modo) {
    try {
        if (modo == "principales") {
            const response = await fetch(
                "https://proyecto-9-scrapping.vercel.app/api/v1/game/principales",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Origin": "localhost:5175",
                    },
                }
            );
            console.log(response);
            frases = await response.json();
        } else if (modo == "todos") {
            const response = await fetch(
                "https://proyecto-9-scrapping.vercel.app/api/v1/game/principalesYSecundarios",
                {
                    method: "GET",
                    headers: new Headers({
                        "Content-Type": "application/json",
                        "Origin": "*"
                    },)
                });
            console.log(response);
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
        <div id="home-container" class="box-shadow flex">
            <h1>Los Simpsons!</h1>
            <h2>Quien dijo la frase...</h2>
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
    gameContainerDiv.className = "box-shadow flex";
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
    const fraseAMostrar = quitarAcentos(frase.frase); // le quitamos los acentos, porque la tipografía no los admite.
    const gameContainer = document.querySelector("#game-container");
    gameContainer.innerHTML += `
        <div id="frase-container" class="flex">
            <p>"${fraseAMostrar}"</p>
        </div>
    `;

    // vamos a hacer un poquito de responsive acá, si la frase supera cierto largo, que se modifique su font-size.
    const fraseDiv = document.querySelector("#frase-container>p");
    if (fraseAMostrar.length > 200) {
        fraseDiv.style.fontSize = "17px";
    } else if (fraseAMostrar.length > 150) {
        fraseDiv.style.fontSize = "18px";
    } else if (fraseAMostrar.length > 100) {
        fraseDiv.style.fontSize = "20px";
    } else if (fraseAMostrar.length > 80) {
        fraseDiv.style.fontSize = "23px";
    } else if (fraseAMostrar.length > 60) {
        fraseDiv.style.fontSize = "25px";
    } else if (fraseAMostrar.length > 50) {
        fraseDiv.style.fontSize = "29px";
    } else if (fraseAMostrar.length > 40) {
        fraseDiv.style.fontSize = "33px";
    } else if (fraseAMostrar.length > 30) {
        fraseDiv.style.fontSize = "35px";
    } else if (fraseAMostrar.length <= 30) {
        fraseDiv.style.fontSize = "39px"
    }
}

function mostrarBotones(modo) {
    const gameContainer = document.querySelector("#game-container");
    const botonesDiv = document.createElement("div");
    botonesDiv.id = "buttons-and-h3-container";
    botonesDiv.innerHTML = `
        
        <h3 id="quien-lo-dijo">Quien lo dijo... </h3>
        <div id="buttons-container" class="flex">
            ${frases.map((objeto) => `
                <button class="select-frase-button button" onclick="manejarSeleccionFrase('${objeto.nombre}', '${modo}')">${objeto.nombre}</button>
            `).join('')}
        </div>
    `;
    gameContainer.appendChild(botonesDiv);
}

function ocultarBackToHome() {
    const divApp = document.querySelector("#app");
    const oldButton = document.querySelector("#backToHome-button-container");
    if (oldButton) {
        divApp.removeChild(oldButton);
    }
}

function mostrarBackToHome() {
    ocultarBackToHome(); // si habia uno, lo quitamos
    const divApp = document.querySelector("#app");
    const backToHomeButtonDiv = document.createElement("div");
    backToHomeButtonDiv.id = "backToHome-button-container";
    backToHomeButtonDiv.innerHTML = `
        <button class="backToHome-button button" onclick="crearHome()">Volver</button>
    `;
    divApp.prepend(backToHomeButtonDiv);
}

function mostrarPuntaje() {
    const gameContainer = document.querySelector("#game-container");

    // Eliminar cualquier puntaje anterior del DOM antes de mostrar el nuevo puntaje
    const puntajeAnterior = gameContainer.querySelector("#puntaje");
    if (puntajeAnterior) {
        gameContainer.removeChild(puntajeAnterior);
    }
    const puntajeDiv = document.createElement("div");
    puntajeDiv.innerHTML = `
        <h3>Puntos: ${puntaje}</h3>
        <h3>Vidas: ${vidas}</h3>
    `;
    puntajeDiv.id = "puntaje";
    gameContainer.appendChild(puntajeDiv);
}

function gameOver() {
    ocultarBackToHome()
    // En el gameContainer aparecerá aleatoreamente uno de los gif!
    const gifIndex = Math.floor(Math.random() * gifsUrl.length);
    const gameContainer = document.querySelector("#game-container");
    gameContainer.innerHTML = `
        <div id="game-over-container" class="flex">
            <h3 id="game-over-text">Game Over!</h3>
            <img src="${gifsUrl[gifIndex]}" id="game-over-gif">
            <div id="buttons-container">
                <button class="game-over-button button" onclick="crearHome()">Volver</button>
            </div>
        </div>
    `;
}

function manejarSeleccionFrase(nombre, modo) {
    // Verificar si el nombre del botón coincide con el nombre de la frase mostrada
    if (nombre === fraseMostrada.nombre) {
        puntaje++;
        mostrarPuntaje();   // actualiza los puntos que se muestran
    } else {
        vidas--;
    }
    if (vidas == -1) {
        gameOver()  // Si no quedan vidas, se termina el juego
    } else {
        // Si todavía tiene vidas, pasar a la siguiente frase (sigue el juego)
        gameSecuence(modo)
    }
}

function quitarAcentos(cadena) {
    // Mapa de caracteres con acentos y sus equivalentes sin acento
    const mapaAcentos = {
        'á': 'a',
        'é': 'e',
        'í': 'i',
        'ó': 'o',
        'ú': 'u',
        'ü': 'u',
        'ñ': 'n',
        'Á': 'A',
        'É': 'E',
        'Í': 'I',
        'Ó': 'O',
        'Ú': 'U',
        'Ü': 'U',
        'Ñ': 'N'
    };
    // Utilizamos expresiones regulares para reemplazar los caracteres con acento
    return cadena.replace(/[áéíóúüñÁÉÍÓÚÜÑ]/g, function (match) {
        return mapaAcentos[match];
    });
}

const gifsUrl = [
    "2112.gif",
    "6392ecddeec3e.gif",
    "giphy-9.gif",
    "giphy.webp",
    "homerbush.gif",
    "Homero-Los-Simpson.gif",
    "main-qimg-620ce4751cb12a65372013e1134b4a71.webp",
    "ralph-wave-1573678867.gif",
    "ralph-wiggum-smiles-rolls-down-hill.gif",
    "simpson-1536171233.gif",
    "simpson-1553589356.gif",
    "tumblr_8a76648ecc2a2d056802be287db51e27_f37a7f64_400.gif",
    "tumblr_m7oueziDsw1rwl09fo1_500.gif",
    "tumblr_m8jikzBXTP1rvn6njo1_500.gif"
]

function comenzarJuego(modo) {
    if (modo == "principales") {
        vidas = 5;
    } else if (modo = "secundarios") {
        vidas = 3;
    }
    borrarHome()
    crearGameContainer()
    gameSecuence(modo);
}
