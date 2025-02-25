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
        <button className="secondary-button button mr-1" onClick={logout}>
          Logout
        </button>
        <button className="button login" onClick={() => setShowModal(true)}>
          Novo Post
        </button>
      </div>
      <h1 className="title">Mini Instagram</h1>
      <h3>
        Olá, <b>{user}</b>!
      </h3>

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
