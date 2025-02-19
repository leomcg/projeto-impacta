/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth-context";
import NewPostForm from "../NewPostForm/NewPostForm.jsx";
import "./Header.css";

const Header = ({ user, onPostCreated }) => {
  const { logout } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="header">
      <div className="buttons">
        <button className="button logout" onClick={logout}>
          Logout
        </button>
        <button className="button" onClick={() => setShowModal(true)}>
          Novo Post
        </button>
      </div>
      <h1 className="title">Mini Instagram</h1>
      <p className="text">
        Olá, <b>{user}</b>!
      </p>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <NewPostForm
              onPostCreated={(newPost) => {
                onPostCreated(newPost);
                setShowModal(false);
              }}
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
    </div>
  );
};

export default Header;
