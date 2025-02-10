const express = require("express");
const router = express.Router();

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

router.get("/:pid", (req, res) => {
  const postId = req.params.pid;
  const post = DUMMY_POSTS.find((post) => {
    return post.id === postId;
  });

  if (!post) {
    return res.status(404).json({ message: "Post não encontrado" });
  }

  res.json({ post });
});

router.get("/user/:uid", (req, res) => {
  const userId = req.params.uid;
  const posts = DUMMY_POSTS.filter((post) => {
    return post.creator === userId;
  });

  if (!posts || posts.length === 0) {
    return res.status(404).json({ message: "Usuário não encontrado" });
  }

  res.json({ posts });
});

module.exports = router;
