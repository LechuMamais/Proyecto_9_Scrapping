const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const mongoose = require('mongoose');
const fs = require('fs');

const frasesPrincipales = require('../src/api/models/frasesPrincipales.model');
const frasesSecundarios = require('../src/api/models/frasesSecundarios.model');

// Lee los datos del archivo JSON
const datosRaw = fs.readFileSync('../scrapper/frases.json');
const datos = JSON.parse(datosRaw);

// Datos de personajes principales y secundarios
const personajesPrincipalesFrases = datos.PersonajesPrincipales_Frases;
const personajesSecundariosFrases = datos.PersonajesSecundarios_Frases;

// Conexión a la base de datos MongoDB utilizando la URL en el archivo .env
mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a la base de datos:'));
db.once('open', async () => {
  console.log('Conexión exitosa a la base de datos');

  try {
    // Elimina todos los elementos existentes antes de sembrar nuevos datos
    await frasesPrincipales.deleteMany({});
    await frasesSecundarios.deleteMany({});

    // Sembrar datos en la base de datos
    await frasesPrincipales.insertMany(personajesPrincipalesFrases);
    await frasesSecundarios.insertMany(personajesSecundariosFrases);

    console.log('Datos sembrados exitosamente en la base de datos');

    // Cierra la conexión a la base de datos después de sembrar los datos
    mongoose.connection.close();
  } catch (error) {
    console.error('Error al sembrar datos en la base de datos:', error);
    mongoose.connection.close();
  }
});
