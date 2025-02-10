const express = require("express");
const bodyParser = require("body-parser");

const postsRoutes = require("./routes/posts-routes");

const app = express();

app.use(bodyParser.json());

app.use("/api/posts", postsRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({
    message: error.message || "Ops... algo deu errado, tente novamente.",
  });
});

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
