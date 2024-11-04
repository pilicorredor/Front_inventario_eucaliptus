import React, { useState, useEffect } from "react";
import './SendEmailPassword.css';
import { IoMdMail } from "react-icons/io";
import { SERVICES, ROLES } from "../../Constants/Constants";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";


const SendEmailPassword = ({ userRol, username }) => {
    const [email, setEmail] = useState("");
    const [personData, setPersonData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: username,
    });
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        fetchPersonInfo();
    }, []);

    const fetchPersonInfo = async () => {
        try {
            if (userRol === ROLES.ADMIN) {
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
                        idPerson: data.idPerson,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        username,
                    });
                } else {
                    console.error(response)
                }
            } else {
                const url = `${SERVICES.CONFIG_GET_SELLER_DATA_SERVICE}/${username}`;
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log(data)
                } else {
                    console.error(response)
                }
            }
        } catch (error) {
            console.error("Error en la solicitud de datos de la persona:", error);
        }
    }

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const handleSubmit = async () => {
        setLoading(true);

        if (email != personData.email) {
            alert('El correo ingresado no coincide con el registrado, porfavor verifica tu correo e intentalo de nuevo')
            setLoading(false);
        } else {

            try {
                const url = `${SERVICES.RECOVERY_EMAIL_REQUEST}/${email}`
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        email,
                    }),
                });

                if (response.ok) {
                    setLoading(false);
                    console.log(response)
                    navigate("/config/check-token-password");

                } else {
                    setLoading(false);
                    console.log(response)
                }

            } catch (error) {
                alert(error)
                setLoading(false);
            }
        }
    };

    //lilianah111001@gmail.com

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
                        onChange={handleInputChange(setEmail)}
                    />
                    <IoMdMail className="email-icon" />
                </div>
                <div className="send-email-btn">
                    {loading && (
                        <div className="loading-container">
                            <CircularProgress className="loading-icon" />
                        </div>
                    )}
                    <button onClick={handleSubmit}>Enviar Correo</button>
                </div>
            </div>
        </div>
    );
}

export default SendEmailPassword;