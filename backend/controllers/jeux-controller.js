import HttpError from "../util/Http-error.js";
import { v4 as uuidv4 } from "uuid";
import { validationResult } from "express-validator";
import { Jeu } from "../models/jeux.js";

const getJeux = async (req, res, next) => {
  let jeux;
  try {
    jeux = await Jeu.find();
  } catch (e) {
    const err = new HttpError("Une erreur dans la Bd est survenue", 500);
    return next(err);
  }
  res.json({ jeux: jeux });
};

const getJeuId = async (req, res, next) => {
  const jeuId = req.params.tid;
  let jeu;
  try {
    jeu = await Jeu.findById(jeuId);
  } catch (e) {
    console.log(e);
    const err = new HttpError("Une erreur dans la Bd est survenue", 500);
    return next(err);
  }
  if (!jeu) {
    return next(new HttpError("Jeu non trouvee", 404));
  }
  res.json({ jeu: jeu.toObject({ getters: true }) });
};

const createJeu = async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    console.log(validationErrors);
    return next(
      new HttpError("données saisies invalides valider votre payload", 422),
    );
  }

  const { nom, categorie, joueurs, duree } = req.body;

  const createdJeu = new Jeu({
    nom,
    categorie,
    joueurs: String(joueurs),
    duree: String(duree),
  });

  try {
    await createdJeu.save();
  } catch (err) {
    const erreur = new HttpError("Creation dans la bd echoue :(", 500);
    return next(erreur);
  }

  res.status(201).json({ jeu: createdJeu });
};

const modifierJeu = async (req, res, next) => {
  const jeuId = req.params.tid;
  const jeuUpdates = req.body;

  try {
    const updatedJeu = await Jeu.findByIdAndUpdate(jeuId, jeuUpdates, {
      new: true,
    });
    if (!updatedJeu) {
      return res.status(404).json({ message: "Jeu non trouvee" });
    }
    res.status(200).json({ jeu: updatedJeu.toObject({ getters: true }) });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la modificatoin de la tache" });
  }
};

const supprierJeu = async (req, res, next) => {
  const jeuId = req.params.tid;

  try {
    const jeu = await Jeu.findByIdAndDelete(jeuId);
    if (!jeu) {
      return res.status(404).json({ message: "Jeu non trouve" });
    }
    res.status(200).json({ message: "Jeu supprimer" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Erreur lors de la suppresion de la tache dans la bd" });
  }
};

export { getJeux, getJeuId, createJeu, modifierJeu, supprierJeu };
