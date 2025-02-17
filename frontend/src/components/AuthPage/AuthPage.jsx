/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import api from "../../api/api";

const AuthPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");

  const handleAuth = async () => {
    try {
      let response = undefined;
      if (isSignup) {
        response = await api.post("/users/signup", { email, password, name });
      } else {
        response = await api.post("/users/login", { email, password });
      }

      if (response.status === 200 || response.status === 201) {
        login();
        navigate("/home", { replace: true });
      }
    } catch (err) {
      console.error(err);
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Erro de rede. Tente novamente.");
      }
    }
  };

  return (
    <>
      <h1 className="title">Mini Instagram</h1>
      <div className="container">
        <h2 className="subtitle">{isSignup ? "Cadastre-se" : "Login"}</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {isSignup && (
          <input
            className="input"
            type="text"
            placeholder="Nome*"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          className="input"
          type="email"
          placeholder="Email*"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input"
          type="password"
          placeholder="Senha (mínimo 5 caracteres)*"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="button" onClick={handleAuth}>
          {isSignup ? "Cadaste-se" : "Login"}
        </button>
        <p className="text">
          {isSignup ? "Já tem uma conta?" : "Não tem uma conta?"}{" "}
          <button
            className="link-button"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Login" : "Cadastre-se"}
          </button>
        </p>
      </div>
    </>
  );
};

export default AuthPage;
