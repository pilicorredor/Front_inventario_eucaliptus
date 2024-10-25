import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../Assets/logo2.png";
import Header from "../Header/Header";

const RegisterProduct = () => {
    
  return (
    <div className="products">
      <Header pageTitle="Productos - Registrar" />
      <div>
        <div className="products-section">
          <label className="sellerSection-title">Agregar Nuevo Producto</label>
        </div>
        <div className="steps-section">
          <label className="step-by-step">Paso 2 de 2</label>
          <label className="step-information">Información del producto</label>
        </div>
      </div>
    </div>
  );
};

export default RegisterProduct;
