/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import api from "../../api/api";
import "./NewPostForm.css";
import { useNavigate } from "react-router-dom";

const NewPostForm = ({ onPostCreated, isEdit, postData }) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const user = localStorage.getItem("userName");
  const userId = localStorage.getItem("userId");

  // Preencher os campos quando for edição
  useEffect(() => {
    if (isEdit && postData) {
      setTitle(postData.title || "");
      setDescription(postData.description || "");
      setImageUrl(postData.image || "");
    }
  }, [isEdit, postData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || description.length < 5) {
      alert(
        "Título é obrigatório e a descrição deve ter pelo menos 5 caracteres."
      );
      return;
    }

    if (!isEdit) {
      try {
        const response = await api.post("/posts", {
          title,
          description,
          user,
          image: imageUrl,
          userId,
        });

        setHomePagePosts(response.data.post);
      } catch (error) {
        console.error("Erro ao criar post:", error);
        alert("Erro ao criar post, tente novamente.");
      }
    } else {
      try {
        const response = await api.patch(`/posts/${postData.id}`, {
          title,
          description,
          image: imageUrl,
        });

        setHomePagePosts(response.data.post);
      } catch (error) {
        console.error("Erro ao editar post:", error);
        alert("Erro ao editar post, tente novamente.");
      }
    }
  };

  const setHomePagePosts = (newPost) => {
    setTitle("");
    setDescription("");
    setImageUrl("");

    onPostCreated(newPost);
    navigate("/home", { replace: true });
  };

  return (
    <>
      <h2 className="subtitle">{isEdit ? "Editar" : "Criar Novo"} Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          placeholder="Título*"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="input"
          type="text"
          placeholder="URL da imagem*"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <textarea
          className="input"
          placeholder="Descrição*"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="button" type="submit">
          {isEdit ? "Editar" : "Criar"} Post
        </button>
      </form>
    </>
  );
};

export default NewPostForm;
