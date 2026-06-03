const mongoose = require("mongoose");

const ActeurSchema = new mongoose.Schema({
  nom: { type: String, required: true, trim: true },
  age: { type: Number, min: 0 },
});

module.exports = mongoose.model("Acteur", ActeurSchema);
