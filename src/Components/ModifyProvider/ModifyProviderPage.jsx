import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ModifyProvider.css";
import logo from "../Assets/logo2.png";
import CustomModal from "../../Modales/CustomModal";
import Header from "../Header/Header";
import {
  BUTTONS_ACTIONS,
  ENTITIES,
  ROLES,
  PERSON_TYPE,
  SERVICES,
} from "../../Constants/Constants";

const ModifyProvider = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [send, setSend] = useState(false);
  const [update, setUpdate] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [entity, setEntity] = useState("proveedor");
  const [action, setAction] = useState("modificar");

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

  const fillProvider = (dataProvider) => {
    console.log("data provider en fill provider: ", dataProvider);
    setProviderSend(dataProvider);
    console.log("provider send: ", providerSend);
  };

  useEffect(() => {
    const fetchProviderById = async () => {
      try {
        const token = localStorage.getItem("token");
        const url = `${SERVICES.GET_PROVIDER_BY_ID}/${id}`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          fillProvider(data);
        } else {
          console.error("Error al traer el proveedor:", await response.json());
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    fetchProviderById();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Verifica si el campo pertenece a personDTO o companyDTO
    if (name in providerSend.personDTO) {
      setProviderSend((prevProvider) => ({
        ...prevProvider,
        personDTO: {
          ...prevProvider.personDTO,
          [name]: value,
        },
      }));
    } else if (name in providerSend.companyDTO) {
      setProviderSend((prevProvider) => ({
        ...prevProvider,
        companyDTO: {
          ...prevProvider.companyDTO,
          [name]: value,
        },
      }));
    } else {
      setProviderSend((prevProvider) => ({
        ...prevProvider,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSend(true);
  };

  useEffect(() => {
    if (send) {
      handleService();
    }
  }, [send]);

  const handleService = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = `${SERVICES.MODIFY_PROVIDER_SERVICE}/${id}`;
      const method = "PUT";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(providerSend),
      });

      if (response.ok) {
        const data = await response.json();
        handleModalOpen({
          selectedEntity: ENTITIES.PROVEEDOR,
          selectedAction: BUTTONS_ACTIONS.MODIFICAR,
          success: true,
        });
        console.log("Proveedor modificado exitosamente:", data);
      } else {
        const errorData = await response.json();
        console.error("Error al modificar el proveedor:", errorData);
      }
    } catch (error) {
      handleModalOpen({
        selectedEntity: ENTITIES.PROVEEDOR,
        selectedAction: BUTTONS_ACTIONS.MODIFICAR,
        success: false,
      });
      console.error("Error en la solicitud:", error);
    } finally {
      setSend(false);
    }
  };

  const handleModalOpen = ({ selectedEntity, selectedAction, success }) => {
    setEntity(selectedEntity);
    setAction(selectedAction);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setSend(false);
    navigate("/personal");
  };

  return (
    <div className="provider-section-container">
      <Header pageTitle="Personal" />
      <div className="provider-section">
        {update ? (
          <label className="providerSection-title">Modificar Proveedor</label>
        ) : (
          <label className="providerSection-title">Modificar Proveedor</label>
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
                  value={providerSend.personDTO.firstName}
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
                  value={providerSend.personDTO.lastName}
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
                  value={providerSend.personDTO.email}
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
                  value={providerSend.personDTO.phoneNumber}
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
                  value={providerSend.personType}
                  onChange={handleInputChange}
                  required
                  disabled
                >
                  <option>{providerSend.personType}</option>
                </select>
              </div>
              <div className="providerForm-item">
                <label>
                  Número de documento (NIT o cédula){" "}
                  <span className="red">*</span>
                </label>
                <input
                  type="text" //arreglar esto--------------------------------------------------------------!!!!!!
                  name="nit"
                  value={providerSend.companyDTO.nit}
                  onChange={handleInputChange}
                  required
                  disabled
                />
              </div>
            </div>
            <div className="providerForm-row">
              <div className="providerForm-item">
                <label>Empresa</label>
                <input
                  type="text"
                  name="companyName"
                  value={providerSend.companyDTO.companyName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="providerForm-item">
                <label>Teléfono de la empresa</label>
                <input
                  type="text"
                  name="companyPhoneNumber"
                  value={providerSend.companyDTO.companyPhoneNumber}
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
                  value={providerSend.companyDTO.companyEmail}
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
                  value={providerSend.companyDTO.companyAddress}
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
                  value={providerSend.companyDTO.bankName}
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
                  value={providerSend.companyDTO.bankAccountNumber}
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
              : BUTTONS_ACTIONS.MODIFICAR.charAt(0).toUpperCase() +
                BUTTONS_ACTIONS.MODIFICAR.slice(1)}
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

export default ModifyProvider;
