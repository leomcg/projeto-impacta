const express = require("express");
const bodyParser = require("body-parser");

const postsRoutes = require("./routes/posts-routes");

const app = express();

app.use(bodyParser.json());

app.use("/", postsRoutes);

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
