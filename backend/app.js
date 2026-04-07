import express from "express";
import jeuxRoute from "./routes/jeux-routes.js";
import { errorHandler } from "./handler/error-handler.js";

const app = express();

app.use(express.json())
app.use("/api/jeux", jeuxRoute);
app.use((req, res, next) => {
  const erreur = new Error("Route non trouvée");
  erreur.code = 404;
  next(erreur);
});
app.use(errorHandler);

app.listen(5000);
