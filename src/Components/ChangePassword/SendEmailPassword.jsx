import React, { useState, useEffect } from "react";
import './SendEmailPassword.css';
import { IoMdMail } from "react-icons/io";
import { SERVICES, ROLES } from "../../Constants/Constants";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useEmail } from '../../Context/EmailContext';


const SendEmailPassword = () => {
    const { email, setEmail } = useEmail();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);


    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const handleSubmit = async () => {
        setLoading(true);

        try {
            const url = `${SERVICES.RECOVERY_EMAIL_REQUEST}/${email}`
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
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
                alert('El correo ingresado no coincide con el registrado, porfavor verifica tu correo e intentalo de nuevo')
                console.log(response)
            }

        } catch (error) {
            setLoading(false);
            alert(error)
        }
    };

    //lilianah111001@gmail.com

    return (
        <div className="emailPassword-section">
            <div className="emailPassword-content">
                <h1>Actualiza tu contraseña</h1>
                <p>Enviaremos un número de seis dígitos a tu correo para que puedas actualizar tu contraseña</p>
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