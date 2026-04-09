import mongoose from "mongoose";

const jeuSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  categorie: {
    type: String,
    required: true,
    enum: ["stratégie", "coopératif", "famille", "ambiance", "cartes"],
  },
  joueurs: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
  },
  duree: { type: Number, required: true },
});

export const Jeu = mongoose.model("jeu", jeuSchema);
