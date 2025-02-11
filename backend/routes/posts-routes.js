const express = require("express");
const {
  getPlaceById,
  getPostsByUserId,
} = require("../controllers/posts-controller");
const router = express.Router();

router.get("/:pid", getPlaceById);

router.get("/user/:uid", getPostsByUserId);

module.exports = router;
