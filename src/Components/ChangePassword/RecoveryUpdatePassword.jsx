import React, { useState } from "react";
import './RecoveryUpdatePassword.css';
import { FaEyeSlash } from "react-icons/fa";
import { useEmail } from "../../Context/EmailContext";
import { useVerifCode } from "../../Context/VerificationCodeContext";
import { SERVICES } from "../../Constants/Constants";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";


const RecoveryUpdatePassword = () => {

    const [loading, setLoading] = useState(false);
    const [newPassword, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { email } = useEmail();
    const { code } = useVerifCode();
    const navigate = useNavigate();


    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

    const handleSubmit = async () => {
        if (newPassword !== confirmPassword) {
            setErrorMessage("Las contraseñas no coinciden. Por favor, verifícalas.");
        } else {
            setErrorMessage("");
            setLoading(true);
            try {
                console.log(code);
                const response = await fetch(SERVICES.RECOVERY_PASSWORD, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        newPassword,
                        code,
                    }),
                });

                if (response.ok) {
                    setLoading(false);
                    alert("Contraseña actualizada correctamente")
                    navigate("/");

                } else {
                    setLoading(false);
                    console.log(response)
                }

            } catch (error) {
                setLoading(false);
                alert(error)
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