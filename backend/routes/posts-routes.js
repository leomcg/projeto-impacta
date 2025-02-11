// Importa o framework Express
const express = require("express");

// Importa funções do controlador de posts, que serão usadas nas rotas
const {
  getPlaceById,
  getPostsByUserId,
  createPost,
} = require("../controllers/posts-controller");

// Cria um roteador do Express para definir as rotas relacionadas a posts
const router = express.Router();

// Define uma rota GET para buscar um lugar específico pelo seu ID (pid)
router.get("/:pid", getPlaceById);

// Define uma rota GET para obter posts de um usuário específico pelo seu ID (uid)
router.get("/user/:uid", getPostsByUserId);

// Define uma rota POST para criar um novo post
router.post("/", createPost);

// Exporta o roteador para ser usado em outras partes da aplicação
module.exports = router;
