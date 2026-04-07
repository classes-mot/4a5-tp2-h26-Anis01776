import express from "express";
import { check } from "express-validator";
import { checkAuth } from "../middleware/check-auth.js";
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
  checkAuth,
  [
    check("nom").isLength({ min: 3 }),
    check("categorie").not().isEmpty(),
    check("joueurs").isInt({ min: 1 }),
    check("duree").isInt({ min: 1 }),
  ],
  createJeu,
);

router.patch("/:tid", checkAuth, modifierJeu);

router.delete("/:tid", checkAuth, supprierJeu);

export default router;
