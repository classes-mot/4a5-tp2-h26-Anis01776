import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import HttpError from "../util/Http-error.js";

let defaultUsers = [
  {
    id: "u1",
    name: "Test Testeur",
    email: "test@test.test",
    password: "test123",
  },
];

const registerUser = (req, res, next) => {
  const { name, email, password } = req.body;
  const hasUser = defaultUsers.find((u) => u.email === email);
  if (hasUser) {
    res.status(422).json({ message: "Mail deja utiliser" });
    return;
  }
  const createdUser = {
    id: uuidv4(),
    name,
    email,
    password,
  };
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
  setTimeout(() => {
    defaultUsers.push(createdUser);
    res.status(201).json({ user: createdUser, token: token });
  }, 1000);
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
