import React from 'react';
import './LoginForm.css';
import { FaUser } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import logo from "../Assets/logo2.png";
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ handleLogin }) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Evitar que el formulario se recargue
    handleLogin(); // Ejecutar la función handleLogin para cambiar el estado de login
    navigate('/inicio'); // Redirigir a la ruta /home (en tu caso es /inicio)
  };

  return (
    <div className='login-section'>
    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="Logo de la Empresa" className="logo" />
        <h1>¡Bienvenido!</h1>
        <div className='input-box'>
          <input type="text" placeholder='Nombre de Usuario'  />
          <FaUser className='icon' />
        </div>
        <div className='input-box'>
          <input type="password" placeholder='Contraseña'  />
          <FaEyeSlash className='icon' />
        </div>
        <div className="remember-forgot">
          <label><input type='checkbox' />Recuerdame</label>
          <a href='#'>¿Olvidaste tu contraseña?</a>
        </div>
        <div className='button-container'>
          <button type='submit'>Entrar</button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default LoginForm;
