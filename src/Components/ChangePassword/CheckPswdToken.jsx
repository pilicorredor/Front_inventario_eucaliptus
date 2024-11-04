import React, { useState } from "react";
import './CheckPswdToken.css';
import { useEmail } from "../../Context/EmailContext";
import CircularProgress from "@mui/material/CircularProgress";
import { SERVICES } from "../../Constants/Constants";
import { useNavigate } from "react-router-dom";



const CheckPswdToken = () => {
    const [loading, setLoading] = useState(false);
    const { email } = useEmail();
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [code, setCode] = useState("");

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await fetch(SERVICES.RECOVERY_VALIDATE_CODE, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    email,
                    code,
                }),
            });

            if (response.ok) {
                setLoading(false);
                console.log(response)
                navigate("/config/update-password");

            } else {
                setLoading(false);
                console.log(response)
            }

        } catch (error) {
            alert(error)
            setLoading(false);
        }

    };

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
    };

    return (
        <div className="tokenPassword-section">
            <div className="tokenPassword-content">
                <h1>Confirmar código</h1>
                <p>Ingresa a continuación el número que recibiste en tu correo</p>
                <div className="input-token-box">
                    <input
                        type="number"
                        name="input-token"
                        placeholder="123456"
                        onChange={handleInputChange(setCode)}
                    />
                </div>
                {loading && (
                    <div className="loading-container">
                        <CircularProgress className="loading-icon" />
                    </div>
                )}
                <div className="send-token-btn">
                    <button onClick={handleSubmit}>Verificar</button>
                </div>
            </div>
        </div>
    );
}

export default CheckPswdToken;