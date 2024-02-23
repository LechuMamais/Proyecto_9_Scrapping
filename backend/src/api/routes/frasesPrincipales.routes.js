const FrasesPrincipalesRoutes = require('express').Router();
const { getFrasePrinicipalById, getFrasesPrinicipales, createFrasePrinicipal } = require('../controllers/frasesPrincipales.controller');

FrasesPrincipalesRoutes.get('/:id', getFrasePrinicipalById);
FrasesPrincipalesRoutes.get('/', getFrasesPrinicipales);
FrasesPrincipalesRoutes.post('/', createFrasePrinicipal);

module.exports = FrasesPrincipalesRoutes;