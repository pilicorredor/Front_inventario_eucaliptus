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
} from "../../Constants/Constants";

const RegistrarProveedor = ({ providerData }) => {
  const navigate = useNavigate();
  const [send, setSend] = useState(false);
  const [providerSend, setProviderSend] = useState({
    personDTO: {
      idPerson: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
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
    setProvider((prevProvider) => ({
      ...prevProvider,
      [name]: value,
    }));
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos al servidor o hacer alguna validación
    console.log(provider);

    setProviderSend({
      personDTO: {
        idPerson: provider.nit,
        firstName: provider.firstName,
        lastName: provider.lastName,
        email: provider.email,
        phoneNumber: provider.phoneNumber,
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

    // Abrir el modal después de intentar registrar o modificar
    handleModalOpen({
      selectedEntity: ENTITIES.PROVEEDOR,
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
    console.log("handle service: ", providerSend);
    console.log(JSON.stringify(providerSend, null, 2));
    //LLAMAR EL SERVICIO CON EL FECTH Y LE PASO EL SELLERSEND AL SERVICIO------------------------------------------------------------------
  };

  return (
    <div className="provider-section-container">
      <Header pageTitle="Personal" />
      <div className="provider-section">
        {update ? (
          <label className="providerSection-title">Modificar Proveedor</label>
        ) : (
          <label className="providerSection-title">
            Agregar Nuevo Proveedor
          </label>
        )}
        <form className="providerForm" onSubmit={handleSubmit}>
          <div className="providerForm-section">
            <h3 className="providerForm-title">Información básica</h3>
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
                  value={provider.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="providerForm-item">
                <label>
                  Teléfono <span className="red">*</span>
                </label>
                <input
                  type="number"
                  name="phoneNumber"
                  value={provider.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Información adicional */}
          <div className="providerForm-section">
            <h3 className="providerForm-title">Información del proveedor</h3>
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
            <div className="providerForm-row">
              <div className="providerForm-item">
                <label>Empresa</label>
                <input
                  type="text"
                  name="companyName"
                  value={provider.companyName}
                  onChange={handleInputChange}
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
            <div className="providerForm-row">
              <div className="providerForm-item">
                <label>Nombre del banco</label>
                <input
                  type="text"
                  name="bankName"
                  value={provider.bankName}
                  onChange={handleInputChange}
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

export default RegistrarProveedor;
