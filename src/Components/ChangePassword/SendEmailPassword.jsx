import React from "react";
import './SendEmailPassword.css';
import { IoMdMail } from "react-icons/io";


const SendEmailPassword = () => {

    return (
        <div className="emailPassword-section">
            <div className="emailPassword-content">
                <h1>Actualiza tu contraseña</h1>
                <p>Enviaremos un número de cuatro dígitos a tu correo para que puedas actualizar tu contraseña</p>
                <div className="input-email-box">
                    <input
                        type="text"
                        name="input-email"
                        placeholder="laura@example.com"
                    />
                    <IoMdMail className="email-icon"/>
                </div>
                <div className="send-email-btn">
                    <button>Enviar Correo</button>
                </div>
            </div>
        </div>
    );
}

export default SendEmailPassword;