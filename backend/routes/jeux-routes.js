import express from "express";
import { check } from "express-validator";
import {
  getJeux,
  getJeuId,
  createJeu,
  modifierJeu,
  supprierJeu,
} from "../controllers/jeux-controller.js";

const router = express.Router();

router.get("/", getJeux);

router.get("/:tid", getJeuId);

router.post(
  "/",
  [
    check("nom").isLength({ min: 3 }),
    check("categorie").not().isEmpty(),
    check("joueurs").isInt({ min: 1 }),
    check("duree").isInt({ min: 1 }),
  ],
  createJeu,
);

router.patch("/:tid", modifierJeu);

router.delete("/:tid", supprierJeu);

export default router;
