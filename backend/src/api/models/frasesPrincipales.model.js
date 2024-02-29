const mongoose = require('mongoose')

const frasesPrincipalesSchema = new mongoose.Schema(
  {
    nombre: { type: String, trim: true, required: true },
    frase: { type: String, trim: true, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const frasesPrincipales = mongoose.model('frasesPrincipales', frasesPrincipalesSchema, 'frasesPrincipales')
module.exports = frasesPrincipales