const frasesPrincipales = require('../models/frasesPrincipales.model');
const FrasesSecundarios = require('../models/frasesSecundarios.model');

const getFrasesPrincipalesAleatorias = async (req, res, next) => {
    try {
        // Obtenemos el número total de elementos en la colección de frases de personajes principales
        const count = await frasesPrincipales.countDocuments();

        // Verificamos si hay suficientes frases para obtener tres aleatorias
        if (count < 3) {
            return res.status(400).json({ error: "No hay suficientes frases de personajes principales para obtener tres aleatorias." });
        }

        // Generamos tres índices aleatorios diferentes
        const randomIndices = [];
        while (randomIndices.length < 3) {
            const randomIndex = Math.floor(Math.random() * count);
            if (!randomIndices.includes(randomIndex)) {
                randomIndices.push(randomIndex);
            }
        }

        // Obtenemos las frases y los personajes correspondientes a los índices aleatorios generados
        const frasesPrincipalesAleatorias = [];
        for (const indice of randomIndices) {
            const fraseAleatoria = await frasesPrincipales.findOne().skip(indice);
            frasesPrincipalesAleatorias.push(fraseAleatoria);
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
        

        // Genera tres índices aleatorios diferentes uno del otro. 
        const randomIndices = [];
        while (randomIndices.length < 3) {
            const randomIndex = Math.floor(Math.random() * count);
            // Si no es repetido, sino vuelve al bucle hasta que sean 3
            if (!randomIndices.includes(randomIndex)) {
                randomIndices.push(randomIndex);
            }
        }
        console.log(randomIndices);

        // Obtenemos los elementos correspondientes a los índices aleatorios generados, dependiendo si son de principales
        // o secundarios, los vamos a buscar en una u otra collection
        const frasesPrincipalesYSecundariosAleatorias = [];
        for(const indice of randomIndices){
            let fraseAleatoria;
            // Verificar si el índice aleatorio pertenece a frases principales o secundarias
            if (indice < countPrincipales) {
                fraseAleatoria = await frasesPrincipales.findOne().skip(indice);
            } else {
                fraseAleatoria = await FrasesSecundarios.findOne().skip(indice - countPrincipales);
            }
            // Agregar la frase aleatoria al arreglo resultante
            frasesPrincipalesYSecundariosAleatorias.push(fraseAleatoria);
        }
        // Finalmente retornamos el array de objetos con las tres frases que obtuvimos de forma aleatoria.
        return res.status(200).json(frasesPrincipalesYSecundariosAleatorias);
    } catch (error) {
        return res.status(400).json(error);
    }
}

module.exports = { getFrasesPrincipalesAleatorias, getFrasesPrincipalesYSecundariosAleatorias };