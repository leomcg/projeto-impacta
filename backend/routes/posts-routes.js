const express = require("express");
const {
  getPlaceById,
  getPostsByUserId,
  createPost,
} = require("../controllers/posts-controller");
const router = express.Router();

router.get("/:pid", getPlaceById);

router.get("/user/:uid", getPostsByUserId);

router.post("/", createPost);
module.exports = router;
