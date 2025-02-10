const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("get request for posts");
  res.json({ message: "get request for posts" });
});

module.exports = router;
