const mongoose = require("mongoose");

const FilmSchema = new mongoose.Schema({
  titre: { type: String, required: true, trim: true },
  annee: { type: Number, required: true },
  acteurs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Acteur",
    },
  ],
});

module.exports = mongoose.model("Film", FilmSchema);
