const { v4: uuid } = require("uuid");
const { validationResult } = require("express-validator");

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

const signup = (req, res) => {
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

  // Cria um novo usuário com um ID gerado automaticamente
  const createdUser = {
    id: uuid(),
    name,
    email,
    password,
  };

  // Adiciona o novo usuário ao array de usuários fictícios
  DUMMY_USERS.push(createdUser);

  // Retorna a resposta com status 201 (criado) e os dados do novo usuário
  res.status(201).json({ user: createdUser });
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
