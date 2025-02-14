/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import api from "../../api/api";

const AuthPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");

  const handleAuth = async () => {
    try {
      const endpoint = isSignup ? "/users/signup" : "/users/login";
      const response = await api.post(endpoint, { email, password });

      if (response.status === 200 || response.status === 201) {
        if (!isSignup) login();
        navigate("/posts", { replace: true });
      }
    } catch (error) {
      console.error(error);
      setError(isSignup ? "Sign-up falhou" : "Login falhou");
    }
  };

  return (
    <div className="container">
      <h1 className="title">Mini Instagram</h1>
      <h2 className="subtitle">{isSignup ? "Cadastre-se" : "Login"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        className="input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="input"
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="button" onClick={handleAuth}>
        {isSignup ? "Cadaste-se" : "Login"}
      </button>
      <p className="text">
        {isSignup ? "Já tem uma conta?" : "Não tem uma conta?"}{" "}
        <button className="link-button" onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? "Login" : "Cadastre-se"}
        </button>
      </p>
    </div>
  );
};

export default AuthPage;
