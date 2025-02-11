const express = require("express");
const { check } = require("express-validator");

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

router.post(
  "/",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  createPost
);

router.patch(
  "/:pid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  updatePost
);

router.delete("/:pid", deletePost);

// Exporta o roteador para ser usado em outras partes da aplicação
module.exports = router;
