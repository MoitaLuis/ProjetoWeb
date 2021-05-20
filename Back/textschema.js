const mongoose = require('mongoose');

const TextSchema = mongoose.Schema({
  Conteudo: String
});

module.exports = mongoose.model('Textos', TextSchema);