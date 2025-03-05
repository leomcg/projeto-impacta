/* eslint-disable react/prop-types */
import api from "../../api/api";
import "./PostList.css";

const PostList = ({ posts, onPostDeleted }) => {
  const userId = localStorage.getItem("userId");

  const handleDelete = (postId) => {
    const confirmDelete = window.confirm(
      "Tem certeza de que deseja excluir este post?"
    );
    if (confirmDelete) {
      api
        .delete(`/posts/${postId}`)
        .then(() => {
          onPostDeleted(postId);
        })
        .catch((error) => {
          console.error("Erro ao excluir post", error);
          alert("Ocorreu um erro ao excluir o post.");
        });
    }
  };

  const handleEdit = (postId) => {
    console.log("Editando post", postId);
  };

  return (
    <>
      <ul className="text">
        {posts.map((post) => (
          <li key={post.id} className="post-card card">
            <h3>{post.title}</h3>
            {post.image && (
              <div className="post-image">
                <img src={post.image} alt="Imagem do post" />
              </div>
            )}
            <p>{post.description}</p>
            <p className="created">
              {post.createdString} <b>por {post.user}</b>
            </p>
            {post.userId === userId && (
              <div className="button-container">
                <button className="button" onClick={() => handleEdit(post.id)}>
                  Editar
                </button>
                <button
                  className="button secondary-button ml-1"
                  onClick={() => handleDelete(post.id)}
                >
                  Excluir
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default PostList;
