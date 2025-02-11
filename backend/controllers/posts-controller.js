// Importa a função v4 do pacote uuid para gerar IDs únicos
const { v4: uuid } = require("uuid");

// Importa a classe de erro personalizada para tratar erros HTTP
const HttpError = require("../models/http-error");

// Array de posts fictícios para simular um banco de dados
const DUMMY_POSTS = [
  {
    id: "p1",
    title: "My First Post",
    description: "This is the description of my first post.",
    creator: "u1",
  },
  {
    id: "p2",
    title: "My Second Post",
    description: "This is my second post.",
    creator: "u1",
  },
  {
    id: "p3",
    title: "A Day in the Life",
    description: "Sharing my daily routine and experiences.",
    creator: "u2",
  },
  {
    id: "p4",
    title: "Travel Diaries",
    description: "Documenting my travels around the world.",
    creator: "u3",
  },
];

// Função para buscar um post pelo seu ID
const getPlaceById = (req, res) => {
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

// Função para buscar todos os posts de um usuário específico
const getPostsByUserId = (req, res) => {
  const userId = req.params.uid; // Obtém o ID do usuário a partir dos parâmetros da requisição

  // Filtra os posts para encontrar aqueles criados pelo usuário especificado
  const posts = DUMMY_POSTS.filter((post) => {
    return post.creator === userId;
  });

  // Se não houver posts para o usuário fornecido, lança um erro HTTP 404
  if (!posts || posts.length === 0) {
    throw new HttpError("Posts não encontrados para o usuário fornecido", 404);
  }

  // Retorna os posts encontrados no formato JSON
  res.json({ posts });
};

// Função para criar um novo post
const createPost = (req, res) => {
  const { title, description, creator } = req.body; // Extrai os dados do corpo da requisição

  // Cria um novo post com um ID único gerado dinamicamente
  const createdPost = {
    id: uuid(),
    title,
    description,
    creator,
  };

  // Adiciona o novo post ao array de posts fictícios
  DUMMY_POSTS.push(createdPost);

  // Retorna o post criado com status 201 (Created)
  res.status(201).json({ post: createdPost });
};

// Exporta as funções para serem usadas em outros arquivos
exports.getPlaceById = getPlaceById;
exports.getPostsByUserId = getPostsByUserId;
exports.createPost = createPost;
