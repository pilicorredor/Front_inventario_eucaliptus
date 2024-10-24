import React from "react";
import './UpdatePassword.css';
import { FaEyeSlash } from "react-icons/fa";


const UpdatePassword = () => {

    return (
        <div className="updatePassword-section">
            <div className="updatePassword-content">
                <h1>Actualiza tu contraseña</h1>
                <p>Digita una nueva contraseña en el campo a continuación para cambiar tu contraseña</p>
                <div className="input-update-box">
                    <input
                        type="text"
                        name="input-update"
                        placeholder="Nueva contraseña"
                    />
                    <FaEyeSlash className="update-icon" />

                </div>
                <div className="input-update-box">
                    <input
                        type="text"
                        name="input-update"
                        placeholder="Confirmar contraseña"
                    />

                </div>
                <div className="send-update-btn">
                    <button>Actualizar</button>
                </div>
            </div>
        </div>
    );
}

export default UpdatePassword;