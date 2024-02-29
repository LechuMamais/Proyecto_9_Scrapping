const frasesPrincipales = require('../models/frasesPrincipales.model');
const FrasesSecundarios = require('../models/frasesSecundarios.model');

const getFrasesPrincipalesAleatorias = async (req, res, next) => {
    try {
        // Obtenemos el número total de elementos en la colección de frases de personajes principales
        const count = await frasesPrincipales.countDocuments();

        // Obtenemos las frases y los personajes correspondientes a los índices aleatorios generados
        const frasesPrincipalesAleatorias = [];
        for (let i = 0; i < 3; i) {
            const randomIndex = Math.floor(Math.random() * count);
            const fraseAleatoria = await frasesPrincipales.findOne().skip(randomIndex);
            // No queremos devolver dos frases del mismo personaje, para que no aparezcan dos botones con el mismo nombre
            if (!(frasesPrincipalesAleatorias.find((element) => element.nombre === fraseAleatoria.nombre))) {
                frasesPrincipalesAleatorias.push(fraseAleatoria);
                i++
            }
        }

        // Retornamos el array de objetos con las tres frases de personajes principales obtenidas aleatoriamente
        return res.status(200).json(frasesPrincipalesAleatorias);
    } catch (error) {
        return res.status(500).json({ error: "Error al obtener frases de personajes principales aleatorias." });
    }
}

const getFrasesPrincipalesYSecundariosAleatorias = async (req, res, next) => {
    try {
        // Este controller es similar al anterior, sólo que incluirá también las frases de personajes secundarios
        const countPrincipales = await frasesPrincipales.countDocuments();
        const countSecundarios = await FrasesSecundarios.countDocuments();
        const count = countPrincipales + countSecundarios

        // Obtenemos los elementos correspondientes a los índices aleatorios generados, dependiendo si son de principales
        // o secundarios, los vamos a buscar en una u otra collection
        const frasesPrincipalesYSecundariosAleatorias = [];

        for (let i = 0; i < 3; i) {
            const randomIndex = Math.floor(Math.random() * count);
            if (randomIndex < countPrincipales) {
                fraseAleatoria = await frasesPrincipales.findOne().skip(randomIndex);
            } else {
                fraseAleatoria = await FrasesSecundarios.findOne().skip(randomIndex - countPrincipales);
            }
            // No queremos devolver dos frases del mismo personaje, para que no aparezcan dos botones con el mismo nombre
            if (!(frasesPrincipalesYSecundariosAleatorias.find((element) => element.nombre === fraseAleatoria.nombre))) {
                frasesPrincipalesYSecundariosAleatorias.push(fraseAleatoria);
                i++
            }
        }

        // Finalmente retornamos el array de objetos con las tres frases que obtuvimos de forma aleatoria.
        return res.status(200).json(frasesPrincipalesYSecundariosAleatorias);
    } catch (error) {
        return res.status(400).json(error);
    }
}

module.exports = { getFrasesPrincipalesAleatorias, getFrasesPrincipalesYSecundariosAleatorias };