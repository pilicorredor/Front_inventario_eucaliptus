import React from 'react';
import './LoginForm.css';
import { FaUser } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const LoginForm = () => {
  return (
    <div className='wrapper'>
        <form action="">
            <h1>¡Bienvenido!</h1>
            <div className='input-box'>
                <input type="text" placeholder='Nombre de Usuario' required/>
                <FaUser className='icon'/>
            </div>
            <div className='input-box'>
                <input type="password" placeholder='Contraseña' required/>
                <FaEyeSlash className='icon' />
            </div>
            <div className="remeber-forgot">
                <label><input type='checkbox'/>Recuerdame</label>
                <a href='#'>¿Olvidaste tu contraseña?</a>
            </div>
            <button type='submit'>Entrar</button>
        </form>
    </div>
  )
}

export default LoginForm