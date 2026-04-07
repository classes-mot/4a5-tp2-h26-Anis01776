import express from "express";
import { getJeux, getJeuId, createJeu } from "../controllers/jeux-controller.js";

const router = express.Router();

router.get("/", getJeux);

router.get("/:tid", getJeuId);

router.post("/",createJeu)

export default router;
