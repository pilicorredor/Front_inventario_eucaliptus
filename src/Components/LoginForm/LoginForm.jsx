import React, { useState } from "react";
import "./LoginForm.css";
import { FaUser } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import logo from "../Assets/logo2.png";
import { useNavigate } from "react-router-dom";
import { SERVICES } from "../../Constants/Constants";

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar que el formulario se recargue
    try {
      const response = await fetch(SERVICES.LOGIN_SERVICE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        const token = await response.text();
        handleLogin(token);
        navigate("/inicio");
        setError(false);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Error en la solicitud de login:", error);
      setError(true);
    }
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setError(false);
  };

  return (
    <div className="login-section">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <img src={logo} alt="Logo de la Empresa" className="logo" />
          <h1>¡Bienvenido!</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="Nombre de Usuario"
              value={username}
              onChange={handleInputChange(setUsername)}
              required
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={handleInputChange(setPassword)}
              required
            />
            <FaEyeSlash className="icon" />
          </div>
          {error && (
            <div className="error-message">
              Nombre de usuario o contraseña incorrecta
            </div>
          )}
          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              Recuerdame
            </label>
            <a href="#">¿Olvidaste tu contraseña?</a>
          </div>
          <div className="button-container">
            <button type="submit">Entrar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
