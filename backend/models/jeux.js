import mongoose from "mongoose";

const jeuSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  categorie: { type: String, required: true },
  joueurs: { type: String, required: true },
  duree: { type: String, required: true },
});

export const Jeu = mongoose.model("jeu", jeuSchema);
