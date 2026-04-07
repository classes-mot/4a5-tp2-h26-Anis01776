import { v4 as uuidv4 } from "uuid";

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
  setTimeout(() => {
    defaultUsers.push(createdUser);
    res.status(201).json({ user: createdUser });
  }, 1000);
};

const 