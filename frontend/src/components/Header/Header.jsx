/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import "./Header.css";
const Header = (props) => {
  const { logout } = useContext(AuthContext);
  return (
    <div className="header">
      <div className="buttons">
        <button className="button logout" onClick={() => logout()}>
          Logout
        </button>
        <button className="button">Novo Post</button>
      </div>
      <h1 className="title">Mini Instagram</h1>
      <p className="text">
        Olá, <b>{props.user}</b>!
      </p>
    </div>
  );
};

export default Header;
