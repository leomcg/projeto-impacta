/* eslint-disable react/prop-types */
import { useState } from "react";
import api from "../../api/api";
import "./NewPostForm.css";
import { useNavigate } from "react-router-dom";

const NewPostForm = ({ onPostCreated }) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const user = localStorage.getItem("userName");
  const userId = localStorage.getItem("userId");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || description.length < 5) {
      alert(
        "Título é obrigatório e a descrição deve ter pelo menos 5 caracteres."
      );
      return;
    }

    try {
      const response = await api.post("/posts", {
        title,
        description,
        user,
        image: imageUrl,
        userId,
      });
      const newPost = response.data.post; // Get the new post from response

      setTitle("");
      setDescription("");

      onPostCreated(newPost); // Update home page with the new post
      navigate("/home", { replace: true });
    } catch (error) {
      console.error("Erro ao criar post:", error);
      alert("Erro ao criar post, tente novamente.");
    }
  };

  return (
    <>
      <h2 className="subtitle">Criar Novo Post</h2>
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
          placeholder="URL da imagem"
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
          Criar Post
        </button>
      </form>
    </>
  );
};

export default NewPostForm;
