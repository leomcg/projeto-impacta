const { v4: uuid } = require("uuid");
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const { db } = require("../firebase");
const createDate = require("../utils/date");

// Função para buscar todos os posts
const getAllPosts = async (req, res, next) => {
  try {
    const snapshot = await db.collection("posts").get();

    if (snapshot.empty) {
      return next(new HttpError("Nenhum post encontrado", 404));
    }

    const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json({ posts });
  } catch (err) {
    console.error(err);
    return next(new HttpError("Erro ao buscar os posts, tente novamente", 500));
  }
};

// Função para buscar post por ID
const getPostById = async (req, res, next) => {
  const postId = req.params.pid;

  try {
    const postRef = db.collection("posts").doc(postId);
    const doc = await postRef.get();

    if (!doc.exists) {
      return next(new HttpError("Post não encontrado", 404));
    }

    res.json({ post: { id: doc.id, ...doc.data() } });
  } catch (err) {
    console.error(err);
    return next(new HttpError("Erro ao buscar o post, tente novamente", 500));
  }
};

// Função para buscar posts de um usuário específico
const getPostsByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  try {
    const snapshot = await db
      .collection("posts")
      .where("user", "==", userId)
      .get();

    if (snapshot.empty) {
      return next(
        new HttpError("Posts não encontrados para o usuário fornecido", 404)
      );
    }

    const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json({ posts });
  } catch (err) {
    console.error(err);
    return next(
      new HttpError("Erro ao buscar os posts do usuário, tente novamente", 500)
    );
  }
};

// Função para criar um novo post
const createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError(
        "Dados de entrada inválidos fornecidos, por favor, verifique seus dados",
        422
      )
    );
  }

  const { title, description, user } = req.body;
  const newPostId = uuid();
  const postRef = db.collection("posts").doc(newPostId);

  const newPost = {
    id: newPostId,
    title,
    description,
    image: "teste",
    user,
    created: `Criado em ${createDate()}`,
  };

  try {
    await postRef.set(newPost);
    res.status(201).json({ post: newPost });
  } catch (err) {
    console.error(err);
    return next(
      new HttpError("Não foi possível criar o post, tente novamente", 500)
    );
  }
};

// Função para atualizar um post existente
const updatePost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError(
        "Dados de entrada inválidos fornecidos, por favor, verifique seus dados",
        422
      )
    );
  }

  const postId = req.params.pid;
  const { title, description } = req.body;

  const postRef = db.collection("posts").doc(postId);

  try {
    const doc = await postRef.get();

    if (!doc.exists) {
      return next(new HttpError("Post não encontrado", 404));
    }

    await postRef.update({
      title,
      description,
      created: `Editado em ${createDate()}`,
    });

    res.status(200).json({ post: { id: doc.id, title, description } });
  } catch (err) {
    console.error(err);
    return next(
      new HttpError("Erro ao atualizar o post, tente novamente", 500)
    );
  }
};

// Função para deletar um post
const deletePost = async (req, res, next) => {
  const postId = req.params.pid;

  const postRef = db.collection("posts").doc(postId);

  try {
    const doc = await postRef.get();

    if (!doc.exists) {
      return next(new HttpError("Post não encontrado", 404));
    }

    await postRef.delete();
    res.status(200).json({ message: "Post deletado" });
  } catch (err) {
    console.error(err);
    return next(new HttpError("Erro ao deletar o post, tente novamente", 500));
  }
};

exports.getAllPosts = getAllPosts;
exports.getPostById = getPostById;
exports.getPostsByUserId = getPostsByUserId;
exports.createPost = createPost;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
