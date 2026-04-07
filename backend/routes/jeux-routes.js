import express from "express";
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

router.post("/", createJeu);

router.patch("/:tid", modifierJeu);

router.delete("/:tid", supprierJeu);

export default router;
