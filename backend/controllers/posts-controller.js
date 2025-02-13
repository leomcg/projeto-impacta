const { v4: uuid } = require("uuid");

const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const { db } = require("../firebase");
const createDate = require("../utils/date");

let DUMMY_POSTS = [
  {
    id: "p1",
    title: "My First Post",
    description: "This is the description of my first post.",
    user: "u1",
  },
  {
    id: "p2",
    title: "My Second Post",
    description: "This is my second post.",
    user: "u1",
  },
  {
    id: "p3",
    title: "A Day in the Life",
    description: "Sharing my daily routine and experiences.",
    user: "u2",
  },
  {
    id: "p4",
    title: "Travel Diaries",
    description: "Documenting my travels around the world.",
    user: "u3",
  },
];

const getPostById = (req, res) => {
  const postId = req.params.pid; // Obtém o ID do post a partir dos parâmetros da requisição

  // Procura o post correspondente no array de posts
  const post = DUMMY_POSTS.find((post) => {
    return post.id === postId;
  });

  // Se o post não for encontrado, lança um erro HTTP 404
  if (!post) {
    throw new HttpError("Post não encontrado", 404);
  }

  // Retorna o post encontrado no formato JSON
  res.json({ post });
};

const getPostsByUserId = (req, res) => {
  const userId = req.params.uid; // Obtém o ID do usuário a partir dos parâmetros da requisição

  // Filtra os posts para encontrar aqueles criados pelo usuário especificado
  const posts = DUMMY_POSTS.filter((post) => {
    return post.user === userId;
  });

  // Se não houver posts para o usuário fornecido, lança um erro HTTP 404
  if (!posts || posts.length === 0) {
    throw new HttpError("Posts não encontrados para o usuário fornecido", 404);
  }

  // Retorna os posts encontrados no formato JSON
  res.json({ posts });
};

const createPost = async (req, res) => {
  const errors = validationResult(req); // Executa a validação dos dados da requisição
  if (!errors.isEmpty()) {
    throw new HttpError(
      "Dados de entrada inválidos fornecidos, por favor, verifique seus dados",
      422
    );
  }
  const { title, description, user } = req.body; // Extrai os dados do corpo da requisição

  const newPostId = uuid(); // Gera um ID único para o novo usuário

  const postRef = db.collection("posts").doc(newPostId); // Referência para o documento

  const newPost = {
    id: newPostId,
    title,
    description,
    image: "teste",
    user,
    created: `Criado em ${createDate()}`,
  };

  // Cria um novo post no banco de dados
  try {
    await postRef.set(newPost);
  } catch (err) {
    const error = new HttpError(
      "Não foi possível criar o post, tente novamente",
      500
    );
    next(error);
  }

  // Retorna o post criado com status 201 (Created)
  res.status(201).json({ post: newPost });
};

const updatePost = async (req, res) => {
  const errors = validationResult(req); // Executa a validação dos dados da requisição
  if (!errors.isEmpty()) {
    throw new HttpError(
      "Dados de entrada inválidos fornecidos, por favor, verifique seus dados",
      422
    );
  }

  const postId = req.params.pid; // Obtém o ID do post a partir dos parâmetros da requisição
  const { title, description } = req.body; // Extrai os dados do corpo da requisição

  const postRef = db.collection("posts").doc(postId); // Referência para o documento

  // Atualiza o post no banco de dados
  try {
    await postRef.update({
      title,
      description,
      created: `Editado em ${createDate()}`,
    });
  } catch (err) {
    const error = new HttpError(
      "Não foi possível criar o post, tente novamente",
      500
    );
    next(error);
  }

  // Retorna o post criado com status 201 (Created)
  res.status(201).json({ post: "updatedPost" });
};

const deletePost = async (req, res) => {
  const postId = req.params.pid; // Obtém o ID do post a partir dos parâmetros da requisição

  db.collection("posts").doc(postId).delete(); // Deleta o post com o ID fornecido

  res.status(200).json({ message: "Post deletado" }); // Retorna uma mensagem de sucesso
};

// Exporta as funções para serem usadas em outros arquivos
exports.getPostById = getPostById;
exports.getPostsByUserId = getPostsByUserId;
exports.createPost = createPost;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
