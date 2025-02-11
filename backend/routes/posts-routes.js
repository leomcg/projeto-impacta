const express = require("express");

const {
  getPostById,
  getPostsByUserId,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/posts-controller");

// Cria um roteador do Express para definir as rotas relacionadas a posts
const router = express.Router();

router.get("/:pid", getPostById);

router.get("/user/:uid", getPostsByUserId);

router.post("/", createPost);

router.patch("/:pid", updatePost);

router.delete("/:pid", deletePost);

// Exporta o roteador para ser usado em outras partes da aplicação
module.exports = router;
