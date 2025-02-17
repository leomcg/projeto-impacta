/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "../../context/auth-context";
const Header = (props) => {
  const { logout } = useContext(AuthContext);
  return (
    <div>
      <button className="buton" onClick={() => logout()}>
        Logout
      </button>
      <button className="buton">Novo Post</button>
      <h1 className="title">Mini Instagram</h1>
      <p className="text">Bem vindo de volta, {props.user}! </p>
    </div>
  );
};

export default Header;
