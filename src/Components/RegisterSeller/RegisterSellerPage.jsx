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
} from "../../Constants/Constants";

const RegistrarVendedor = ({ sellerData }) => {
  const navigate = useNavigate();
  const [send, setSend] = useState(false);
  const [sellerSend, setSellerSend] = useState({
    personDTO: {
      idPerson: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      role: ROLES.SELLER,
    },
    documentType: DOCUMENT_TYPE.CEDULA,
    documentNumber: "",
    username: "",
    password: "",
    homeAddress: "",
  });

  const [seller, setSeller] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    documentType: DOCUMENT_TYPE.CEDULA,
    documentNumber: "",
    username: "",
    password: "",
    homeAddress: "",
  });

  const [update, setUpdate] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [entity, setEntity] = useState("vendedor");
  const [action, setAction] = useState("registrar");

  // Efecto para cargar los datos si se pasa sellerData como props
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
    // Actualizar sellerSend con los datos de seller y establecer idPerson como documentNumber
    setSellerSend({
      personDTO: {
        idPerson: seller.documentNumber, // Asignar el número de documento como idPerson
        firstName: seller.firstName,
        lastName: seller.lastName,
        email: seller.email,
        phoneNumber: seller.phoneNumber,
        role: ROLES.SELLER,
      },
      documentType: seller.documentType,
      documentNumber: seller.documentNumber,
      username: seller.username,
      password: seller.password,
      homeAddress: seller.homeAddress,
    });

    setSend(true);

    handleModalOpen({
      selectedEntity: ENTITIES.VENDEDOR,
      selectedAction: update
        ? BUTTONS_ACTIONS.MODIFICAR
        : BUTTONS_ACTIONS.REGISTRAR,
    });
  };

  useEffect(() => {
    if (send) {
      handleService();
    }
  }, [send]);

  const handleService = () => {
    console.log("handle service: ", sellerSend);
    console.log(JSON.stringify(sellerSend, null, 2));
    //LLAMAR EL SERVICIO CON EL FECTH Y LE PASO EL SELLERSEND AL SERVICIO------------------------------------------------------------------
  };

  const handleModalOpen = ({ selectedEntity, selectedAction }) => {
    setEntity(selectedEntity);
    setAction(selectedAction);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    //Limpiar el formulario
    setSeller({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      documentType: DOCUMENT_TYPE.CEDULA,
      documentNumber: "",
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
      <Header pageTitle="Personal" />
      <div className="seller-section">
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
                  value={seller.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="sellerForm-item">
                <label>
                  Teléfono <span className="red">*</span>
                </label>
                <input
                  type="number"
                  name="phoneNumber"
                  value={seller.phoneNumber}
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
                  name="documentNumber"
                  value={seller.documentNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="sellerForm-row">
              <div className="sellerForm-item">
                <label>Usuario</label>
                <input
                  type="text"
                  name="username"
                  value={seller.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="sellerForm-item">
                <label>Contraseña</label>
                <input
                  type="text"
                  name="password"
                  value={seller.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="sellerForm-row">
              <div className="sellerForm-item">
                <label>
                  Dirección <span className="red">*</span>
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
          />
        </form>
      </div>
    </div>
  );
};

export default RegistrarVendedor;
