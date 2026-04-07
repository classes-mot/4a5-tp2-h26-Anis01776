import HttpError from "../util/Http-error.js";
import { v4 as uuidv4 } from "uuid";
import { validationResult } from "express-validator";
import { Jeu } from "../models/jeux.js";

let defaultGames = [
  {
    id: "1",
    nom: "Catan",
    categorie: "Strategie",
    joueurs: "3-4",
    duree: "60",
  },
  {
    id: "2",
    nom: "Pandemic",
    categorie: "Cooperatif",
    joueurs: "2-4",
    duree: "45",
  },
  {
    id: "3",
    nom: "7 Wonders",
    categorie: "Famille",
    joueurs: "2-7",
    duree: "30",
  },
  {
    id: "4",
    nom: "Echec",
    categorie: "Strategie",
    joueurs: "2",
    duree: "20",
  },
];

const getJeux = (req, res, next) => {
  res.json({ jeux: defaultGames });
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

const modifierJeu = (req, res, next) => {
  const { nom, categorie, joueurs, duree } = req.body;
  const jeuId = req.params.tid;
  const updatedJeu = { ...defaultGames.find((j) => j.id === jeuId) };
  const jeuIndex = defaultGames.findIndex((j) => j.id === jeuId);
  if (nom) updatedJeu.nom = nom;
  if (categorie) updatedJeu.categorie = categorie;
  if (joueurs) updatedJeu.joueurs = joueurs;
  if (duree) updatedJeu.duree = duree;
  defaultGames[jeuIndex] = updatedJeu;
  res.status(200).json({ jeu: updatedJeu });
};

const supprierJeu = (req, res, next) => {
  const jeuId = req.params.tid;
  defaultGames = defaultGames.filter((j) => j.id !== jeuId);
  res.status(200).json({ message: "Jeu supprimer" });
};

export { getJeux, getJeuId, createJeu, modifierJeu, supprierJeu };
