import express from "express";
import { registerUser, login } from "../controllers/users-controller.js";
import { check } from "express-validator";

const router = express.Router();
const verification = [
  check("email").isEmail(),
  check("password")
    .isLength({ min: 3 }),
];

router.post("/register", verification, registerUser);

router.post("/login", login);

export default router;
