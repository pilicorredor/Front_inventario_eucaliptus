import React, { useState } from "react";
import "./LoginForm.css";
import { FaUser } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import logo from "../Assets/logo2.png";
import { useNavigate } from "react-router-dom";
import { SERVICES } from "../../Constants/Constants";
import CircularProgress from "@mui/material/CircularProgress";

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("username", data.username);
        setLoading(false);
        handleLogin({
          username: localStorage.getItem("username"),
          role: localStorage.getItem("role"),
        });
        navigate("/inicio");
        setError(false);
      } else {
        setLoading(false);
        setError(true);
      }
    } catch (error) {
      console.error("Error en la solicitud de login:", error);
      setLoading(false);
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
        {loading && (
          <div className="loading-container">
            <CircularProgress className="loading-icon" />
          </div>
        )}
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
