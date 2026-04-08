import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import HttpError from "../util/Http-error.js";
import { User } from "../models/User.js";

let defaultUsers = [
  {
    id: "u1",
    name: "Test Testeur",
    email: "test@test.test",
    password: "test123",
  },
];

const registerUser = async (req, res, next) => {
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
  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      "cleTresTresTresSecret???",
      { expiresIn: "1h" },
    );
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500,
    );
    return next(error);
  }
  res
    .status(201)
    .json({ user: createdUser.toObject({ getters: true }), token: token });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const identifiedUser = defaultUsers.find(
    (u) => (u.email === email) & (u.password === password),
  );
  if (!identifiedUser) {
    res
      .status(401)
      .json({ message: "Identification echouee , verifier les identifiants" });
  } else {
    let token;
    try {
      token = jwt.sign(
        { userId: identifiedUser.id, email: identifiedUser.email },
        "cleTresTresTresSecret???",
        { expiresIn: "1h" },
      );
    } catch (err) {
      const error = new HttpError(
        "Signing up failed, please try again later.",
        500,
      );
      return next(error);
    }
    res.json({
      message: "Identification reussie",
      userId: identifiedUser.id,
      email: identifiedUser.email,
      token: token,
    });
  }
};

export { registerUser, login };
