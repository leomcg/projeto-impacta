// Importa o framework Express, que facilita a criação de servidores web em Node.js
const express = require("express");

// Importa o body-parser para interpretar corpos de requisições JSON
const bodyParser = require("body-parser");

// Importa o modelo HttpError, que é usado para criar erros personalizados
const HttpError = require("./models/http-error");

// Importa as rotas relacionadas aos posts, que estão definidas em outro arquivo
const postsRoutes = require("./routes/posts-routes");

// Cria uma instância do aplicativo Express
const app = express();

// Configura o middleware para analisar corpos de requisições no formato JSON
app.use(bodyParser.json());

// Define um middleware para lidar com as rotas que começam com "/api/posts"
// Todas as requisições feitas para essa rota serão tratadas no postsRoutes
app.use("/api/posts", postsRoutes);

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

  // Define o status HTTP com base no código do erro ou usa 500 (erro interno do servidor)
  res.status(error.code || 500);

  // Retorna um JSON com a mensagem de erro, ou uma mensagem genérica caso não haja uma específica
  res.json({
    message: error.message || "Ops... algo deu errado, tente novamente.",
  });
});

// Inicia o servidor na porta 5000 e exibe uma mensagem no console
app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
