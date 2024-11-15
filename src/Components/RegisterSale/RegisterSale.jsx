import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../Header/Header.jsx";
import CustomTableSale from "../CustomTableSale/CustomTableSale.jsx";
import "./RegisterSale.css";

const RegisterSale = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialSummaryData = location.state?.summaryData || [];
  const [summaryData, setSummaryData] = useState(initialSummaryData);
  const [consumerData, setConsumerData] = useState({
    idPerson: "",
    name: "",
    email: "",
  });

  const handleNextSale = () => {
    navigate("/factura-venta", { state: { summaryData, consumerData } });
  };

  const handleRemoveFromSummary = (id) => {
    setSummaryData((prevSummary) =>
      prevSummary.filter((item) => item.id_modify !== id)
    );
  };

  const columnsProducts = [
    "idProduct",
    "productName",
    "quantitySelected",
    "useProduct",
    "unitPrice",
    "subTotal",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const validateNumericInput = (value) => {
      return value.replace(/\D/g, "");
    };

    if (name === "idPerson") {
      const processedValue = validateNumericInput(value);

      setConsumerData((prevConsumer) => ({
        ...prevConsumer,
        [name]: processedValue,
      }));
    } else {
      setConsumerData((prevConsumer) => ({
        ...prevConsumer,
        [name]: value,
      }));
    }
  };

  const handleInput = (event) => {
    const regex = /^[A-Za-z\s]*$/;
    if (!regex.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^A-Za-z\s]/g, "");
    }
  };

  const handleValidation = (e) => {
    const minLength = e.target.minLength;
    const maxLength = e.target.maxLength;
    const valueLength = e.target.value.length;

    if (valueLength < minLength) {
      e.target.setCustomValidity(
        `El número debe tener entre ${minLength} y ${maxLength} digitos.`
      );
    } else {
      e.target.setCustomValidity("");
    }
  };

  const handleInputReset = (e) => {
    e.target.setCustomValidity("");
  };

  return (
    <div className="products-sale">
      <Header pageTitle="Registrar Venta" />
      <div>
        <div className="steps-section-register-sale">
          <label className="step-by-step-register-sale">Paso 2 de 2</label>
          <label className="step-information-register-sale">
            Datos del cliente
          </label>
        </div>

        <div className="customer-info-row">
          <div className="customer-info-field">
            <label>Número de Documento:</label>
            <input
              type="text"
              placeholder="Ingrese el documento"
              name="idPerson"
              value={consumerData.idPerson}
              onChange={handleInputChange}
              minLength="7"
              maxLength="10"
              onInvalid={handleValidation}
              onInput={handleInputReset}
              className="customer-input"
            />
          </div>
          <div className="customer-info-field">
            <label>Nombre:</label>
            <input
              type="text"
              placeholder="Ingrese el nombre"
              name="name"
              value={consumerData.name}
              onChange={handleInputChange}
              onInput={handleInput}
              className="customer-input"
            />
          </div>
          <div className="customer-info-field">
            <label>Correo electrónico:</label>
            <input
              type="email"
              placeholder="Ingrese el correo"
              name="email"
              value={consumerData.email}
              onChange={handleInputChange}
              className="customer-input"
            />
          </div>
        </div>
        <div className="steps-section-register-sale">
          <label className="step-information-register-sale">
            Resumen de venta
          </label>
        </div>
        <CustomTableSale
          widthTable={"100%"}
          dataProducts={summaryData}
          customColumns={columnsProducts}
          handleRemove={handleRemoveFromSummary}
          isNewSale={false}
        />

        <div className="generate-sale-btn-container">
          <button
            className="generate-sale-btn"
            onClick={handleNextSale}
            disabled={summaryData.length === 0}
          >
            Generar Venta
          </button>
        </div>
      </div>
    </div>
  );
};
export default RegisterSale;
