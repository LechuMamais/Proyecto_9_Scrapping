const mongoose = require('mongoose')

const frasesSecundariosSchema = new mongoose.Schema(
  {
    nombre: { type: String, trim: true, required: true },
    frase: { type: String, trim: true, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const frasesSecundarios = mongoose.model('frasesSecundarios', frasesSecundariosSchema, 'frasesSecundarios')
module.exports = frasesSecundarios