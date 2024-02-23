const frasesPrincipales = require('../models/frasesPrincipales.model');
const FrasesSecundarios = require('../models/frasesSecundarios.model');

const getFrasesSecundarios = async (req, res, next) =>  {
    try {
        const frases = await FrasesSecundarios.find();
        return res.status(200).json(frases);
    } catch (error) {
        return next(error);
    }
}

const getFraseSecundarioById = async (req, res, next) => {
    try {
        const frase = await FrasesSecundarios.findById(req.params.id);
        return res.status(200).json(frase);
    } catch (error) {
        return next(error);
    }
}

const createFraseSecundario = async (req, res, next) => {
    try {
        const newFrase = new FrasesSecundarios(req.body)
        const frase = await newFrase.save( )
        return res.status(201).json(frase);
    } catch (error) {
        return next(error);
    }
}


module.exports = { getFrasesSecundarios, getFraseSecundarioById, createFraseSecundario };