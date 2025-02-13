const { v4: uuid } = require("uuid");
const { validationResult } = require("express-validator");
const { db } = require("../firebase");

const HttpError = require("../models/http-error");

DUMMY_USERS = [
  {
    id: "u1",
    name: "Leticia Alves",
    email: "test@test.com",
    password: "la",
  },
];

const getUsers = (req, res) => {
  res.json({ users: DUMMY_USERS });
};

const signup = async (req, res) => {
  const errors = validationResult(req); // Executa a validação dos dados da requisição
  if (!errors.isEmpty()) {
    throw new HttpError(
      "Dados de entrada inválidos, verifique seus dados",
      422
    );
  }

  const { name, email, password } = req.body; // Obtém os dados do corpo da requisição

  // Verifica se o e-mail já está cadastrado
  if (DUMMY_USERS.find((user) => user.email === email)) {
    throw new HttpError(
      "Não foi possível criar o usuário, email já cadastrado.",
      422
    );
  }

  const newUserId = uuid(); // Gera um ID único para o novo usuário

  // Referência para o documento do novo usuário e criação do documento
  const userRef = db.collection("users").doc(newUserId);

  // Cria um novo usuário
  const user = await userRef.set({
    id: newUserId,
    name,
    email,
    password,
  });

  // Retorna a resposta com status 201 (criado) e os dados do novo usuário
  res.status(201).json({ user });
};

const login = (req, res) => {
  const { email, password } = req.body; // Obtém os dados do corpo da requisição

  // Procura um usuário com o e-mail fornecido
  const identifiedUser = DUMMY_USERS.find((user) => user.email === email);

  // Verifica se o usuário existe e se a senha está correta
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError("Credenciais inválidas, login falhou.", 401);
  }

  // Retorna mensagem de sucesso caso as credenciais estejam corretas
  res.json({ message: "Login bem-sucedido!" });
};

// Exporta as funções para serem usadas em outras partes da aplicação
exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
