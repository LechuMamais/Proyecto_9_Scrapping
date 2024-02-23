const frasesPrincipales = require('../models/frasesPrincipales.model');

const getFrasesPrinicipales = async (req, res, next) => {
    try {
        const frases = await frasesPrincipales.find();
        return res.status(200).json(frases);
    } catch (error) {
        return next(error);
    }
}

const getFrasePrinicipalById = async (req, res, next) => {
    try {
        const frase = await frasesPrincipales.findById(req.params.id);
        return res.status(200).json(frase);
    } catch (error) {
        return next(error);
    }
}

const createFrasePrinicipal = async (req, res, next) => {
    try {
        const newFrase = new frasesPrincipales(req.body)
        const frase = await newFrase.save()
        return res.status(201).json(frase);
    } catch (error) {
        return next(error);
    }
}


module.exports = { getFrasesPrinicipales, getFrasePrinicipalById, createFrasePrinicipal };