const FrasesAleatoriasRoutes = require('express').Router();
const { getFrasesPrincipalesAleatorias, getFrasesPrincipalesYSecundariosAleatorias } = require('../controllers/frasesAleatorias.controller');

FrasesAleatoriasRoutes.get('/principales', getFrasesPrincipalesAleatorias);
FrasesAleatoriasRoutes.get('/principalesYSecundarios', getFrasesPrincipalesYSecundariosAleatorias);

module.exports = FrasesAleatoriasRoutes; 