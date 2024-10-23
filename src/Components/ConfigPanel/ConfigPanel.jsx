import React from "react";
import Header from "../Header/Header.jsx";
import userImg from "../Assets/person-circle.png";
import "./ConfigPanel.css";
import { FaEdit } from "react-icons/fa";

const Config = () => {
    return (
        <div className="config">
            <Header pageTitle="Configuración" />
            <div className="cofig-content">
                <div className="card-user-info">
                    <img src={userImg} alt="User Icon" />
                    <div className="config-name">Laura Carreño</div>
                    <div className="config-userRol">Rol: Administrador</div>
                </div>
                <p className="config-p">Actualiza la información de tu perfil en el momento que lo necesites,
                    cuando estes satisfecho con tus cambios dale click al botón de “Guardar Cambios” y listo!
                </p>
                <div className="config-form">
                    <div className="configForm-row">
                        <div className="configForm-item">
                            <label>
                                Nombres y Apellidos
                            </label>
                            <div className="input-and-button">
                                <input
                                    type="text"
                                    name="config-input-name"
                                    placeholder="Laura Carreño"
                                />
                                <button><FaEdit /></button>
                            </div>
                        </div>
                        <div className="configForm-item">
                            <label>
                                Correo
                            </label>
                            <div className="input-and-button">
                                <input
                                    type="text"
                                    name="config-input-email"
                                    placeholder="laura@example.com"
                                />
                                <button><FaEdit /></button>
                            </div>
                        </div>
                    </div>
                    <div className="configForm-row">
                        <div className="configForm-item">
                            <label>
                                Username
                            </label>
                            <div className="input-and-button">
                                <input
                                    type="text"
                                    name="config-input-username"
                                    placeholder="LauraCarreño"
                                />
                                <button><FaEdit /></button>
                            </div>

                        </div>
                        <div className="configForm-item">
                            <label>
                                Contraseña
                            </label>
                            <div className="input-and-button">
                                <input
                                    type="text"
                                    name="config-input-password"
                                    placeholder="**********"
                                />
                                <button><FaEdit /></button>
                            </div>
                            <a href="#">Actualizar contraseña</a>
                        </div>
                    </div>
                </div>
                <div className="config-button-container">
                    <button className="confing-submit-btn" type="config-submit">Guardar Cambios</button>
                </div>
            </div>
        </div>
    );
}

export default Config;