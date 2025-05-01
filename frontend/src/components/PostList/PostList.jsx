/* eslint-disable react/prop-types */
import { useState } from "react";
import NewPostForm from "../NewPostForm/NewPostForm";
import api from "../../api/api";
import "./PostList.css";

const PostList = ({ posts, onPostDeleted, onPostCreated }) => {
  const userId = localStorage.getItem("userId");
  const [showModal, setShowModal] = useState(false);
  const [postData, setPostData] = useState({
    id: "",
    title: "",
    description: "",
    image: "",
  });

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
                <button
                  className="button"
                  onClick={() => {
                    setShowModal(true);
                    setPostData({
                      id: post.id,
                      title: post.title,
                      description: post.description,
                      image: post.image,
                    });
                  }}
                >
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
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div
            className="modal-content container"
            onClick={(e) => e.stopPropagation()}
          >
            <NewPostForm
              onPostCreated={(newPost) => {
                onPostCreated(newPost);
                setShowModal(false);
              }}
              isEdit={true}
              postData={postData}
            />
            <button
              className="close-button"
              onClick={() => setShowModal(false)}
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PostList;
