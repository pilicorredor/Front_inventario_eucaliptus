import React, { useState, useEffect } from "react";
import Header from "../Header/Header.jsx";
import userImg from "../Assets/person-circle.png";
import "./ConfigPanel.css";
import { FaEdit } from "react-icons/fa";
import { SERVICES, ROLES } from "../../Constants/Constants.js";

const Config = ({ userRol, username }) => {
    const [isNameEditable, setIsNameEditable] = useState(false);
    const [isLastNameEditable, setIsLastNameEditable] = useState(false);
    const [isEmailEditable, setIsEmailEditable] = useState(false);
    const [isUsernameEditable, setIsUsernameEditable] = useState(false);
    const [personData, setPersonData] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });


    const handleEditName = (event) => {
        event.preventDefault();
        setIsNameEditable(!isNameEditable);
    };

    const handleEditLastName = (event) => {
        event.preventDefault();
        setIsLastNameEditable(!isLastNameEditable);
    };

    const handleEditEmail = (event) => {
        event.preventDefault();
        setIsEmailEditable(!isEmailEditable);
    };

    const handleEditUsername = (event) => {
        event.preventDefault();
        setIsUsernameEditable(!isUsernameEditable);
    };

    const fetchPersonInfo = async () => {
        try {
            if (userRol === ROLES.ADMIN) {
                const token = localStorage.getItem("token");
                const response = await fetch(SERVICES.CONFIG_GET_ADMIN_DATA_SERVICE, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setPersonData({
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                    });
                }
            } else {
                const token = localStorage.getItem("token");
                const response = await fetch(SERVICES.CONFIG_GET_SELLER_DATA_SERVICE`${username}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log(data)
                }
            }
        } catch (error) {
            console.error("Error en la solicitud de datos de la persona:", error);
        }
    }

    useEffect(() => {
        fetchPersonInfo();
    }, []);

    return (
        <div className="config">
            <Header pageTitle="Configuración" />
            <div className="cofig-content">
                <div className="card-user-info" >
                    <img src={userImg} alt="User Icon" />
                    <div className="config-name">{personData.firstName} {personData.lastName}</div>
                    <div className="config-userRol">Rol: {userRol}</div>
                </div>
                <p className="config-p">Actualiza la información de tu perfil en el momento que lo necesites,
                    cuando estes satisfecho con tus cambios dale click al botón de “Guardar Cambios” y listo!
                </p>
                <form className="config-form">
                    <div className="configForm-row">
                        <div className="configForm-item">
                            <label>
                                Nombres
                            </label>
                            <div className="config-input-and-button">
                                <input
                                    type="text"
                                    name="config-input-name"
                                    placeholder={personData.firstName}
                                    disabled={!isNameEditable}
                                />
                                <button onClick={handleEditName}><FaEdit /></button>
                            </div>
                        </div>
                        <div className="configForm-item">
                            <label>
                                Apellidos
                            </label>
                            <div className="config-input-and-button">
                                <input
                                    type="text"
                                    name="config-input-lastname"
                                    placeholder={personData.lastName}
                                    disabled={!isLastNameEditable}
                                />
                                <button onClick={handleEditLastName}><FaEdit /></button>
                            </div>
                        </div>
                    </div>
                    <div className="configForm-row">
                        <div className="configForm-item">
                            <label>
                                Username
                            </label>
                            <div className="config-input-and-button">
                                <input
                                    type="text"
                                    name="config-input-username"
                                    placeholder={username}
                                    disabled={!isUsernameEditable}
                                />
                                <button onClick={handleEditUsername}><FaEdit /></button>
                            </div>

                        </div>
                        <div className="configForm-item">
                            <label>
                                Correo
                            </label>
                            <div className="config-input-and-button">
                                <input
                                    type="text"
                                    name="config-input-email"
                                    placeholder={personData.email}
                                    disabled={!isEmailEditable}
                                />
                                <button onClick={handleEditEmail}><FaEdit /></button>
                            </div>
                        </div>
                    </div>
                    <div className="configForm-row">
                        <div className="configForm-item">
                            <label>
                                Contraseña
                            </label>
                            <div className="config-input-and-button">
                                <input
                                    type="text"
                                    name="config-input-password"
                                    placeholder="**********"
                                    disabled={true}
                                />
                            </div>
                            <a href="/config/send-email-password">Actualizar contraseña</a>
                        </div>
                    </div>
                </form>
                <div className="config-button-container">
                    <button className="confing-submit-btn" type="config-submit">Guardar Cambios</button>
                </div>
            </div>
        </div>
    );
}

export default Config;