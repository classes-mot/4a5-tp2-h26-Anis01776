import jwt from "jsonwebtoken";
import HttpError from "../util/http-error.js";
import { User } from "../models/user.js";
import { validationResult } from "express-validator";

const registerUser = async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return next(
      new HttpError("données saisies invalides valider votre payload", 422),
    );
  }
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (erreur) {
    return next(
      new HttpError("Enregistrement echouer recommence plus tard", 500),
    );
  }

  if (existingUser) {
    return next(new HttpError("Le email est deja utiliser", 422));
  }
  const createdUser = new User({
    email,
    password,
  });
  try {
    await createdUser.save();
  } catch (erreur) {
    return next(
      new HttpError("Enregistrement echouer recommence plus tard", 500),
    );
  }
  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (erreur) {
    return next(new HttpError("Echec de connexion1", 500));
  }
  if (!existingUser || existingUser.password !== password) {
    return next(
      new HttpError("Identification echouer,Verifier les identifions", 401),
    );
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      "cleTresTresTresSecret???",
      { expiresIn: "48h" },
    );
  } catch (err) {
    const error = new HttpError("Erreur lors de la generation de la cle", 500);
    return next(error);
  }
  res.status(200).json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token,
  });
};

export { registerUser, login };
