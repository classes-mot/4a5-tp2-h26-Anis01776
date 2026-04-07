import express from "express";
import jeuxRoute from "./routes/jeux-routes.js";
import { errorHandler } from "./handler/error-handler.js";

const app = express();

app.use("/api/jeux", jeuxRoute);
app.use(errorHandler)
app.listen(5000);
