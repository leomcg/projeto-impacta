const { v4: uuid } = require("uuid");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const { db } = require("../firebase");
const createDate = require("../utils/date");
const { Timestamp } = require("firebase-admin/firestore");

const validateRequest = (req, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError("Dados de entrada inválidos, verifique os dados", 422)
      );
    }
  } catch (error) {
    console.error("Erro na validação da requisição:", error);
    return next(new HttpError("Erro interno na validação", 500));
  }
};

const handleFirestoreError = (err, message, next) => {
  console.error(err);
  return next(new HttpError(message, 500));
};

const getAllPosts = async (req, res, next) => {
  try {
    const snapshot = await db
      .collection("posts")
      .orderBy("created", "desc")
      .get();

    if (snapshot.empty) {
      return next(new HttpError("Nenhum post encontrado", 404));
    }

    const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json({ posts });
  } catch (err) {
    return handleFirestoreError(
      err,
      "Erro ao buscar os posts, tente novamente",
      next
    );
  }
};

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
    return handleFirestoreError(
      err,
      "Erro ao buscar o post, tente novamente",
      next
    );
  }
};

const getPostsByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  try {
    const snapshot = await db
      .collection("posts")
      .where("user", "==", userId)
      .orderBy("created", "desc")
      .get();

    if (snapshot.empty) {
      return next(
        new HttpError("Nenhum post encontrado para este usuário", 404)
      );
    }

    const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json({ posts });
  } catch (err) {
    return handleFirestoreError(
      err,
      "Erro ao buscar os posts do usuário, tente novamente",
      next
    );
  }
};

const createPost = async (req, res, next) => {
  if (validateRequest(req, next)) return;

  const { title, description, user } = req.body;
  const newPostId = uuid();
  const postRef = db.collection("posts").doc(newPostId);

  const newPost = {
    id: newPostId,
    title,
    description,
    image: "teste",
    user,
    created: Timestamp.now(),
    createdString: `Criado em ${createDate()}`,
  };

  try {
    await postRef.set(newPost);
    res.status(201).json({ post: newPost });
  } catch (err) {
    return handleFirestoreError(
      err,
      "Não foi possível criar o post, tente novamente",
      next
    );
  }
};

const updatePost = async (req, res, next) => {
  if (validateRequest(req, next)) return;

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
      updatedAt: Timestamp.now(),
      createdString: `Editado em ${createDate()}`,
    });

    res.status(200).json({ post: { id: doc.id, title, description } });
  } catch (err) {
    return handleFirestoreError(
      err,
      "Erro ao atualizar o post, tente novamente",
      next
    );
  }
};

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
    return handleFirestoreError(
      err,
      "Erro ao deletar o post, tente novamente",
      next
    );
  }
};

exports.getAllPosts = getAllPosts;
exports.getPostById = getPostById;
exports.getPostsByUserId = getPostsByUserId;
exports.createPost = createPost;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
