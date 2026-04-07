import jwt from "jsonwebtoken";
import HttpError from "../util/Http-error.js";

const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Authentification echouee!");
    }
    const decodedToken = jwt.verify(token, "cleTresTresTresSecret???");
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new HttpError("Authentification echouee !", 401);
    return next(error);
  }
};

export { checkAuth };
