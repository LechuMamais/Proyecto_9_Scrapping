const FrasesSecundariosRoutes = require('express').Router();
const { getFraseSecundarioById, getFrasesSecundarios, createFraseSecundario, getFrasesPrincipalesYSecundariosAleatorias } = require('../controllers/frasesSecundarios.controller');

FrasesSecundariosRoutes.get('/:id', getFraseSecundarioById);
FrasesSecundariosRoutes.get('/', getFrasesSecundarios);

module.exports = FrasesSecundariosRoutes; 