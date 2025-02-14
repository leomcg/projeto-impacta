const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const HttpError = require("./models/http-error");
const postsRoutes = require("./routes/posts-routes");
const usersRoutes = require("./routes/users-routes");

const app = express();

app.use(cors({ origin: true }));
app.use(bodyParser.json());

app.use("/api/posts", postsRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Rota não encontrada", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({
      message: error.message || "Ops... algo deu errado, tente novamente.",
    });
});

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
