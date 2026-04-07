import express from "express";
import jeuxRoute from "./routes/jeux-routes.js";
import userRoute from "./routes/users-routes.js";
import { errorHandler } from "./handler/error-handler.js";
import { connectDB } from "./util/bd.js";

await connectDB();

const app = express();

app.use(express.json());
app.use("/api/jeux", jeuxRoute);
app.use("/api/users", userRoute);
app.use((req, res, next) => {
  const erreur = new Error("Route non trouvée");
  erreur.code = 404;
  next(erreur);
});
app.use(errorHandler);

app.listen(5000);
