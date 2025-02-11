const { v4: uuid } = require("uuid");

const HttpError = require("../models/http-error");

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

  // Procura o post correspondente no array de posts fictícios
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

const createPost = (req, res) => {
  const { title, description, user } = req.body; // Extrai os dados do corpo da requisição

  // Cria um novo post com um ID único gerado dinamicamente
  const createdPost = {
    id: uuid(),
    title,
    description,
    user,
  };

  // Adiciona o novo post ao array de posts fictícios
  DUMMY_POSTS.push(createdPost);

  // Retorna o post criado com status 201 (Created)
  res.status(201).json({ post: createdPost });
};

const updatePost = (req, res) => {
  console.log("hello");
  const postId = req.params.pid; // Obtém o ID do post a partir dos parâmetros da requisição
  const { title, description } = req.body; // Extrai os dados do corpo da requisição

  const updatedPost = { ...DUMMY_POSTS.find((post) => post.id === postId) }; // Cria uma cópia do post encontrado
  const postIndex = DUMMY_POSTS.findIndex((post) => post.id === postId); // Encontra o índice do post
  updatedPost.title = title; // Atualiza o título do post
  updatedPost.description = description; // Atualiza a descrição do post
  DUMMY_POSTS[postIndex] = updatedPost; // Substitui o post original pelo post atualizado
  console.log(DUMMY_POSTS);
  res.status(200).json({ post: updatedPost }); // Retorna o post atualizado
};

const deletePost = (req, res) => {
  const placeId = req.params.pid; // Obtém o ID do post a partir dos parâmetros da requisição
  DUMMY_POSTS = DUMMY_POSTS.filter((post) => post.id !== req.params.pid); // Filtra os posts para remover o post com o ID fornecido
  res.status(200).json({ message: "Post deletado" }); // Retorna uma mensagem de sucesso
};

// Exporta as funções para serem usadas em outros arquivos
exports.getPostById = getPostById;
exports.getPostsByUserId = getPostsByUserId;
exports.createPost = createPost;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
