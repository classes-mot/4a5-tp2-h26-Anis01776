import HttpError from "../util/http-error.js";
import { v4 as uuidv4 } from "uuid";
import { validationResult } from "express-validator";
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

const getJeuId = (req, res, next) => {
  const jeuId = req.params.tid;
  const jeu = defaultGames.find((j) => {
    return j.id === jeuId;
  });
  if (!jeu) {
    return next(new HttpError("Jeu non trouvee", 404));
  }
  res.json({ jeu });
};

const createJeu = (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    console.log(validationErrors);
    return next(
      new HttpError("données saisies invalides valider votre payload", 422),
    );
  }

  const { nom, categorie, joueurs, duree } = req.body;
  const createdJeu = {
    id: uuidv4(),
    nom,
    categorie,
    joueurs,
    duree,
  };
  defaultGames.push(createdJeu);
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
