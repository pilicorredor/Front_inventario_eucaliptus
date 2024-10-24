import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterSeller.css";
import logo from "../Assets/logo2.png";
import CustomModal from "../../Modales/CustomModal";
import Header from "../Header/Header";
import {
  BUTTONS_ACTIONS,
  ENTITIES,
  ROLES,
  DOCUMENT_TYPE,
  SERVICES,
} from "../../Constants/Constants";
import CircularProgress from "@mui/material/CircularProgress";

const RegisterSeller = ({ sellerData }) => {
  const navigate = useNavigate();
  const [send, setSend] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sellerSend, setSellerSend] = useState({
    personDTO: {
      idPerson: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      documentType: DOCUMENT_TYPE.CEDULA,
      role: ROLES.SELLER,
    },
    username: "",
    password: "",
    homeAddress: "",
  });

  const [seller, setSeller] = useState({
    idPerson: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    documentType: DOCUMENT_TYPE.CEDULA,
    username: "",
    password: "",
    homeAddress: "",
  });

  const [update, setUpdate] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [entity, setEntity] = useState("vendedor");
  const [action, setAction] = useState("registrar");
  const [successful, setSuccessful] = useState(true);

  useEffect(() => {
    if (sellerData) {
      setUpdate(true);
      setSeller(sellerData);
    }
  }, [sellerData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSeller((prevSeller) => ({
      ...prevSeller,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSellerSend({
      personDTO: {
        idPerson: seller.idPerson,
        firstName: seller.firstName,
        lastName: seller.lastName,
        email: seller.email,
        phoneNumber: seller.phoneNumber,
        documentType: seller.documentType,
        role: ROLES.SELLER,
      },
      username: seller.username,
      password: seller.password,
      homeAddress: seller.homeAddress,
    });

    setSend(true);
    setLoading(true);
  };

  useEffect(() => {
    if (send) {
      handleService();
    }
  }, [send]);

  const handleService = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(SERVICES.REGISTER_SELLER_SERVICE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(sellerSend),
      });

      if (response.ok) {
        handleModalOpen({
          selectedEntity: ENTITIES.VENDEDOR,
          selectedAction: update
            ? BUTTONS_ACTIONS.MODIFICAR
            : BUTTONS_ACTIONS.REGISTRAR,
          success: true,
        });
        setLoading(false);
        setSend(false);
      } else {
        const errorData = await response.json();
        handleModalOpen({
          selectedEntity: ENTITIES.VENDEDOR,
          selectedAction: update
            ? BUTTONS_ACTIONS.MODIFICAR
            : BUTTONS_ACTIONS.REGISTRAR,
          success: false,
        });
        console.error("Error al registrar el vendedor:", errorData);
        setLoading(false);
        setSend(false);
      }
    } catch (error) {
      handleModalOpen({
        selectedEntity: ENTITIES.VENDEDOR,
        selectedAction: update
          ? BUTTONS_ACTIONS.MODIFICAR
          : BUTTONS_ACTIONS.REGISTRAR,
        success: false,
      });
      console.error("Error en la solicitud:", error);
      setLoading(false);
      setSend(false);
    }
  };

  const handleModalOpen = ({ selectedEntity, selectedAction, success }) => {
    setEntity(selectedEntity);
    setAction(selectedAction);
    setSuccessful(success);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setSeller({
      idPerson: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      documentType: DOCUMENT_TYPE.CEDULA,
      username: "",
      password: "",
      homeAddress: "",
    });
    setOpenModal(false);
    setSend(false);
    navigate("/personal");
  };

  return (
    <div className="seller-section-container">
      <Header pageTitle="Personal - Vendedor" />
      <div className="seller-section">
        {loading && (
          <div className="page-loading-container">
            <CircularProgress className="page-loading-icon" />
          </div>
        )}
        {update ? (
          <label className="sellerSection-title">Modificar Vendedor</label>
        ) : (
          <label className="sellerSection-title">Agregar Nuevo Vendedor</label>
        )}
        <form className="sellerForm" onSubmit={handleSubmit}>
          <div className="sellerForm-section">
            <h3 className="sellerForm-title">Información básica</h3>
            <div className="sellerForm-row">
              <div className="sellerForm-item">
                <label>
                  Nombres <span className="red">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={seller.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="sellerForm-item">
                <label>
                  Apellidos <span className="red">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={seller.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="sellerForm-row">
              <div className="sellerForm-item">
                <label>Correo electrónico</label>
                <input
                  type="email"
                  name="email"
                  placeholder="usuario@example.com"
                  value={seller.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="sellerForm-item">
                <label>
                  Teléfono <span className="red">*</span>
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={seller.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="sellerForm-row">
              <div className="sellerForm-item">
                <label>
                  Tipo de documento <span className="red">*</span>
                </label>
                <select
                  name="documentType"
                  value={seller.documentType}
                  onChange={handleInputChange}
                  required
                >
                  <option value={DOCUMENT_TYPE.CEDULA}>
                    Cédula de Ciudadanía
                  </option>
                  <option value={DOCUMENT_TYPE.IMMIGRATION_CARD}>
                    Cédula de Extranjera
                  </option>
                  <option value={DOCUMENT_TYPE.PASSPORT}>Pasaporte</option>
                </select>
              </div>
              <div className="sellerForm-item">
                <label>
                  Número de documento <span className="red">*</span>
                </label>
                <input
                  type="number"
                  name="idPerson"
                  value={seller.idPerson}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="sellerForm-section">
            <h3 className="sellerForm-title">Información del Vendedor</h3>

            <div className="sellerForm-row">
              <div className="sellerForm-item">
                <label>
                  Usuario <span className="red">*</span>
                </label>
                <input
                  type="text"
                  name="username"
                  value={seller.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="sellerForm-item">
                <label>
                  Contraseña <span className="red">*</span>
                </label>
                <input
                  type="text"
                  name="password"
                  value={seller.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="sellerForm-row">
              <div className="sellerForm-item">
                <label>
                  Dirección de residencia <span className="red">*</span>
                </label>
                <input
                  type="text"
                  name="homeAddress"
                  value={seller.homeAddress}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          <button type="submit" className="seller-button">
            {update
              ? BUTTONS_ACTIONS.MODIFICAR.charAt(0).toUpperCase() +
                BUTTONS_ACTIONS.MODIFICAR.slice(1)
              : BUTTONS_ACTIONS.REGISTRAR.charAt(0).toUpperCase() +
                BUTTONS_ACTIONS.REGISTRAR.slice(1)}
          </button>
          <img src={logo} alt="logo" className="seller-logo" />

          <CustomModal
            entity={entity}
            action={action}
            openModal={openModal}
            onClose={handleModalClose}
            successfull={successful}
          />
        </form>
      </div>
    </div>
  );
};

export default RegisterSeller;
