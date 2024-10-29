import React from "react";
import './CheckPswdToken.css';


const CheckPswdToken = () => {

    return (
        <div className="tokenPassword-section">
            <div className="tokenPassword-content">
                <h1>Confirmar código</h1>
                <p>Ingresa a continuación el número que recibiste en tu correo</p>
                <div className="input-token-box">
                    <input
                        type="number"
                        name="input-token"
                        placeholder="1234"
                    />
                </div>
                <div className="send-token-btn">
                    <button>Verificar</button>
                </div>
            </div>
        </div>
    );
}

export default CheckPswdToken;