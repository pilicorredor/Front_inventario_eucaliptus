import React, { useState } from "react";
import './RecoveryUpdatePassword.css';
import { FaEyeSlash } from "react-icons/fa";
import { SERVICES } from "../../Constants/Constants";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";


const RecoveryUpdatePassword = ({ username }) => {

    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem("token");



    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

    const handleSubmit = async () => {
        if (password !== confirmPassword) {
            setErrorMessage("Las contraseñas no coinciden. Por favor, verifícalas.");
        } else {
            setErrorMessage("");
            setLoading(true);
            try {
                const response = await fetch(SERVICES.CONFIG_CHANGE_PASSWORD, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        username,
                        password,
                    }),
                });

                if (response.ok) {
                    setLoading(false);
                    alert("Contraseña actualizada correctamente")
                    navigate("/inicio");

                } else {
                    setLoading(false);
                    alert("No fue posible actualizar la contraseña")
                }

            } catch (error) {
                setLoading(false);
                alert("Error del servidor al actualizar la contraseña")
            }
        }
    };

    return (
        <div className="updatePassword-section">
            <div className="updatePassword-content">
                <h1>Actualiza tu contraseña</h1>
                <p>Digita una nueva contraseña en el campo a continuación para cambiar tu contraseña</p>
                <div className="input-update-box">
                    <input
                        type="password"
                        name="input-update"
                        placeholder="Nueva contraseña"
                        onChange={handlePasswordChange}
                    />
                    <FaEyeSlash className="update-icon" />

                </div>
                <div className="input-update-box">
                    <input
                        type="password"
                        name="input-update"
                        placeholder="Confirmar contraseña"
                        onChange={handleConfirmPasswordChange}
                    />

                </div>

                {errorMessage &&
                    <p className="error-message"
                        style={{ color: "red", fontSize: "16px", marginTop: "5px" }}>

                        {errorMessage}

                    </p>}
                {loading && (
                    <div className="loading-container">
                        <CircularProgress className="loading-icon" />
                    </div>
                )}
                <div className="send-update-btn">
                    <button onClick={handleSubmit}>Actualizar</button>
                </div>
            </div>
        </div>
    );
}

export default RecoveryUpdatePassword;