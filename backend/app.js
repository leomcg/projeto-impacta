const express = require("express");

const bodyParser = require("body-parser");

const HttpError = require("./models/http-error");

const postsRoutes = require("./routes/posts-routes");
const usersRoutes = require("./routes/users-routes");

// Cria uma instância do aplicativo Express
const app = express();

// Configura o middleware para analisar corpos de requisições no formato JSON
app.use(bodyParser.json());

// Define um middleware para lidar com as rotas que começam com "/api/posts"
app.use("/api/posts", postsRoutes);
// Define um middleware para lidar com as rotas que começam com "/api/users"
app.use("/api/users", usersRoutes);

// Middleware para lidar com rotas não encontradas
app.use((req, res, next) => {
  const error = new HttpError("Rota não encontrada", 404);
  throw error;
});

// Middleware de tratamento de erros
app.use((error, req, res, next) => {
  // Se um cabeçalho de resposta já foi enviado, passa o erro para o próximo middleware
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500);

  res.json({
    message: error.message || "Ops... algo deu errado, tente novamente.",
  });
});

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
