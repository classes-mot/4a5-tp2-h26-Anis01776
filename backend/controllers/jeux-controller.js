import { v4 as uuidv4 } from "uuid";

const defaultGames = [
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
    const erreur = new Error("Jeu non trouvée");
    erreur.code = 404;
    return next(erreur);
  }
  res.json({ jeu });
};

const createJeu = (req, res, next) => {
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

export { getJeux, getJeuId, createJeu };
