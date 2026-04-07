import express from "express";
import { getJeux, getJeuId } from "../controllers/jeux-controller.js";

const router = express.Router();

router.get("/", getJeux);

router.get("/:tid", getJeuId);

export default router;
