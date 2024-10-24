import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterProvider.css";
import logo from "../Assets/logo2.png";
import CustomModal from "../../Modales/CustomModal";
import Header from "../Header/Header";
import {
  BUTTONS_ACTIONS,
  ENTITIES,
  ROLES,
  PERSON_TYPE,
  SERVICES,
  DOCUMENT_TYPE,
} from "../../Constants/Constants";
import CircularProgress from "@mui/material/CircularProgress";

const RegisterProvider = ({ providerData }) => {
  const navigate = useNavigate();
  const [send, setSend] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phoneWarning, setPhoneWarning] = useState("");
  console.log("phoneWarning");
  const [providerSend, setProviderSend] = useState({
    personDTO: {
      idPerson: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      documentType: DOCUMENT_TYPE.CEDULA,
      role: ROLES.PROVIDER,
    },
    personType: PERSON_TYPE.NATURAL,
    companyDTO: {
      nit: "",
      companyName: "",
      companyPhoneNumber: "",
      companyEmail: "",
      companyAddress: "",
      bankName: "",
      bankAccountNumber: "",
    },
  });
  const [provider, setProvider] = useState({
    idPerson: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    documentType: DOCUMENT_TYPE.CEDULA,
    personType: PERSON_TYPE.NATURAL,
    nit: "",
    companyName: "",
    companyPhoneNumber: "",
    companyEmail: "",
    companyAddress: "",
    bankName: "",
    bankAccountNumber: "",
  });

  const [update, setUpdate] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [entity, setEntity] = useState("proveedor");
  const [action, setAction] = useState("registrar");
  const [legalPerson, setLegalPerson] = useState(false);

  // Abrir el modal con la entidad y acción correspondientes
  const handleModalOpen = ({ selectedEntity, selectedAction }) => {
    setEntity(selectedEntity);
    setAction(selectedAction);
    setOpenModal(true);
  };

  // Cerrar el modal
  const handleModalClose = () => {
    setProvider({
      idPerson: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      documentType: DOCUMENT_TYPE.CEDULA,
      personType: PERSON_TYPE.NATURAL,
      nit: "",
      companyName: "",
      companyPhoneNumber: "",
      companyEmail: "",
      companyAddress: "",
      bankName: "",
      bankAccountNumber: "",
    });
    setOpenModal(false);
    setSend(false);
    // Redirigir solo después de cerrar el modal
    navigate("/personal");
  };

  // Efecto para cargar los datos si se pasa providerData como props
  useEffect(() => {
    if (providerData) {
      setUpdate(true);
      setProvider(providerData);
    }
  }, [providerData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // if (name === "phoneNumber") {
    //   if (value.length !== 10) {
    //     setPhoneWarning("El número de teléfono debe tener exactamente 10 dígitos.");
    //   } else {
    //     setPhoneWarning("");
    //   }
    // }

    setProvider((prevProvider) => ({
      ...prevProvider,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setProviderSend({
      personDTO: {
        idPerson: provider.idPerson,
        firstName: provider.firstName,
        lastName: provider.lastName,
        email: provider.email,
        phoneNumber: provider.phoneNumber,
        documentType: provider.documentType,
        role: ROLES.PROVIDER,
      },
      personType: provider.personType,
      companyDTO: {
        nit: provider.nit,
        companyName: provider.companyName,
        companyPhoneNumber: provider.companyPhoneNumber,
        companyEmail: provider.companyEmail,
        companyAddress: provider.companyAddress,
        bankName: provider.bankName,
        bankAccountNumber: provider.bankAccountNumber,
      },
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

      const response = await fetch(SERVICES.REGISTER_PROVIDER_SERVICE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(providerSend),
      });

      if (response.ok) {
        handleModalOpen({
          selectedEntity: ENTITIES.PROVEEDOR,
          selectedAction: update
            ? BUTTONS_ACTIONS.MODIFICAR
            : BUTTONS_ACTIONS.REGISTRAR,
          success: true,
        });
        setLoading(false);
        setSend(false);
      } else {
        const errorData = await response.json();
        console.error("Error al registrar el proveedor:", errorData);
        setLoading(false);
        setSend(false);
      }
    } catch (error) {
      handleModalOpen({
        selectedEntity: ENTITIES.PROVEEDOR,
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

  useEffect(() => {
    if (provider.personType === PERSON_TYPE.LEGAL) {
      setLegalPerson(true);
    }
    if (provider.personType === PERSON_TYPE.NATURAL) {
      setLegalPerson(false);
    }
  }, [provider.personType]);

  return (
    <div className="provider-section-container">
      <Header pageTitle="Personal - Proveedor" />
      <div className="provider-section">
        {loading && (
          <div className="page-loading-container">
            <CircularProgress className="page-loading-icon" />
          </div>
        )}
        {update ? (
          <label className="providerSection-title">Modificar Proveedor</label>
        ) : (
          <label className="providerSection-title">
            Agregar Nuevo Proveedor
          </label>
        )}
        <form className="providerForm" onSubmit={handleSubmit}>
          <div className="providerForm-section">
            <h3 className="providerForm-title">
              Información del representante legal
            </h3>
            <div className="providerForm-row">
              <div className="providerForm-item">
                <label>
                  Nombres <span className="red">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={provider.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="providerForm-item">
                <label>
                  Apellidos <span className="red">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={provider.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="providerForm-row">
              <div className="providerForm-item">
                <label>Correo electrónico</label>
                <input
                  type="email"
                  name="email"
                  placeholder="usuario@example.com"
                  value={provider.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="providerForm-item">
                <label>
                  Teléfono <span className="red">*</span>
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={provider.phoneNumber}
                  onChange={handleInputChange}
                  maxLength="10"
                  minLength="8"
                  required
                  style={{ appearance: "textfield" }}
                />
              </div>
            </div>

            <div className="providerForm-row">
              <div className="providerForm-item">
                <label>
                  Tipo de documento <span className="red">*</span>
                </label>
                <select
                  name="documentType"
                  value={provider.documentType}
                  onChange={handleInputChange}
                  required
                >
                  <option value={DOCUMENT_TYPE.CEDULA}>
                    Cédula de Ciudadanía
                  </option>
                  <option value={DOCUMENT_TYPE.IMMIGRATION_CARD}>
                    Cédula de Extranjería
                  </option>
                  <option value={DOCUMENT_TYPE.PASSPORT}>Pasaporte</option>
                </select>
              </div>
              <div className="providerForm-item">
                <label>
                  Número de documento <span className="red">*</span>
                </label>
                <input
                  type="number"
                  name="idPerson"
                  value={provider.idPerson}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Información adicional */}
          <div className="providerForm-section">
            <h3 className="providerForm-title">Información legal</h3>
            <div className="providerForm-row">
              <div className="providerForm-item">
                <label>
                  Tipo de persona <span className="red">*</span>
                </label>
                <select
                  name="personType"
                  value={provider.personType}
                  onChange={handleInputChange}
                  required
                >
                  <option value={PERSON_TYPE.NATURAL}>Natural</option>
                  <option value={PERSON_TYPE.LEGAL}>Jurídica</option>
                </select>
              </div>
              <div className="providerForm-item">
                <label>
                  Número de documento (NIT o cédula){" "}
                  <span className="red">*</span>
                </label>
                <input
                  type="number"
                  name="nit"
                  value={provider.nit}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            {legalPerson && (
              <div className="companyFrom-container">
                <div className="providerForm-row">
                  <div className="providerForm-item">
                    <label>
                      Empresa <span className="red">*</span>
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={provider.companyName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="providerForm-item">
                    <label>Teléfono de la empresa</label>
                    <input
                      type="text"
                      name="companyPhoneNumber"
                      value={provider.companyPhoneNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="providerForm-row">
                  <div className="providerForm-item">
                    <label>Correo electrónico de la empresa</label>
                    <input
                      type="email"
                      name="companyEmail"
                      placeholder="usuario@example.com"
                      value={provider.companyEmail}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="providerForm-item">
                    <label>
                      Dirección de la empresa <span className="red">*</span>
                    </label>
                    <input
                      type="text"
                      name="companyAddress"
                      value={provider.companyAddress}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="providerForm-row">
              <div className="providerForm-item">
                <label>
                  Nombre del banco <span className="red">*</span>
                </label>
                <input
                  type="text"
                  name="bankName"
                  value={provider.bankName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="providerForm-item">
                <label>
                  Número de cuenta <span className="red">*</span>
                </label>
                <input
                  type="number"
                  name="bankAccountNumber"
                  value={provider.bankAccountNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          <button type="submit" className="provider-button">
            {update
              ? BUTTONS_ACTIONS.MODIFICAR.charAt(0).toUpperCase() +
                BUTTONS_ACTIONS.MODIFICAR.slice(1)
              : BUTTONS_ACTIONS.REGISTRAR.charAt(0).toUpperCase() +
                BUTTONS_ACTIONS.REGISTRAR.slice(1)}
          </button>
          <img src={logo} alt="logo" className="provider-logo" />

          {/* Componente del modal */}
          <CustomModal
            entity={entity}
            action={action}
            openModal={openModal}
            onClose={handleModalClose} // Cierra el modal y redirige
          />
        </form>
      </div>
    </div>
  );
};

export default RegisterProvider;
