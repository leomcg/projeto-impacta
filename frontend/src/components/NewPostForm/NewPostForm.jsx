/* eslint-disable react/prop-types */
import { useState } from "react";
import api from "../../api/api";
import "./NewPostForm.jsx";

const NewPostForm = ({ onPostCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const user = localStorage.getItem("userId"); // Pegando ID do usuário logado

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || description.length < 5) {
      alert(
        "Título é obrigatório e a descrição deve ter pelo menos 5 caracteres."
      );
      return;
    }

    try {
      const response = await api.post("/posts", { title, description, user });
      onPostCreated(response.data.post);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Erro ao criar post:", error);
      alert("Erro ao criar post, tente novamente.");
    }
  };

  return (
    <div className="new-post-form">
      <h2>Criar Novo Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Criar Post</button>
      </form>
    </div>
  );
};

export default NewPostForm;
