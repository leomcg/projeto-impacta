const HttpError = require("../models/http-error");

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

const getPlaceById = (req, res) => {
  const postId = req.params.pid;
  const post = DUMMY_POSTS.find((post) => {
    return post.id === postId;
  });

  if (!post) {
    throw new HttpError("Post não encontrado", 404);
  }

  res.json({ post });
};

const getPostsByUserId = (req, res) => {
  const userId = req.params.uid;
  const posts = DUMMY_POSTS.filter((post) => {
    return post.creator === userId;
  });

  if (!posts || posts.length === 0) {
    throw new HttpError("Posts não encontrados para o usuário fornecido", 404);
  }

  res.json({ posts });
};

exports.getPlaceById = getPlaceById;
exports.getPostsByUserId = getPostsByUserId;
