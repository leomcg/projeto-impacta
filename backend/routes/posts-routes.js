const express = require("express");
const { check } = require("express-validator");

const {
  getPostById,
  getPostsByUserId,
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
} = require("../controllers/posts-controller");

const router = express.Router();

router.get("/", getAllPosts);

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

module.exports = router;
