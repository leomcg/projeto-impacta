const { v4: uuid } = require("uuid");
const { validationResult } = require("express-validator");
const { db } = require("../firebase"); // Assuming Firebase connection is set in this file
const HttpError = require("../models/http-error");

// Get all users from Firestore
const getUsers = async (req, res, next) => {
  try {
    const snapshot = await db.collection("users").get();

    if (snapshot.empty) {
      return next(new HttpError("Nenhum usuário encontrado", 404));
    }

    const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json({ users });
  } catch (err) {
    console.error(err);
    return next(new HttpError("Erro ao buscar usuários, tente novamente", 500));
  }
};

// Sign up a new user
const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Dados de entrada inválidos, verifique seus dados", 422)
    );
  }

  const { name, email, password } = req.body;

  // Check if the email already exists
  const existingUserSnapshot = await db
    .collection("users")
    .where("email", "==", email)
    .get();

  if (!existingUserSnapshot.empty) {
    return next(
      new HttpError(
        "Não foi possível criar o usuário, email já cadastrado.",
        422
      )
    );
  }

  const newUserId = uuid();
  const userRef = db.collection("users").doc(newUserId);

  const newUser = {
    id: newUserId,
    name,
    email,
    password,
    image: "teste",
  };

  try {
    await userRef.set(newUser);
    res.status(201).json({ user: newUser });
  } catch (err) {
    console.error(err);
    return next(
      new HttpError("Não foi possível criar o usuário, tente novamente", 500)
    );
  }
};

// Login a user
const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const snapshot = await db
      .collection("users")
      .where("email", "==", email)
      .get();

    const user = snapshot.empty ? null : snapshot.docs[0].data();

    if (!user || user.password !== password) {
      return next(new HttpError("Credenciais inválidas, login falhou.", 401));
    }

    res.json({ message: "Login bem-sucedido!", user });
  } catch (err) {
    console.error(err);
    return next(new HttpError("Erro ao realizar login, tente novamente", 500));
  }
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
