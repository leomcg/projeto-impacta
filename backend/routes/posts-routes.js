const express = require("express");
const {
  getPlaceById,
  getPlaceByUserId,
} = require("../controllers/posts-controller");
const router = express.Router();

router.get("/:pid", getPlaceById);

router.get("/user/:uid", getPlaceByUserId);

module.exports = router;
