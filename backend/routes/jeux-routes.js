import express from "express";
import { getJeux, getJeuId, createJeu, modifierJeu } from "../controllers/jeux-controller.js";

const router = express.Router();

router.get("/", getJeux);

router.get("/:tid", getJeuId);

router.post("/",createJeu)

router.patch("/",modifierJeu)

export default router;
