import express from "express";
const router = express.Router();

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

router.get("/", (req, res, next) => {
  console.log("Get Request  in Jeux");
  let jeu = null;
  if (defaultGames.length !== 0) {
    jeu = defaultGames;
  }
  res.json({ jeu });
});

router.get("/:tid", (req, res, next) => {
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
});

export default router;
