import express from "express";
const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("Get Request  in Jeux");
  res.json({ message: "Gestion des jeux reussies !" });
});

export default router;