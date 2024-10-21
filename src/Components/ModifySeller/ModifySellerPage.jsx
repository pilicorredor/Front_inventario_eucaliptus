import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ModifySeller.css";
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

const ModifySeller = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [send, setSend] = useState(false);
  const [update, setUpdate] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [entity, setEntity] = useState("vendedor");
  const [action, setAction] = useState("modificar");

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
    password: "******",
    homeAddress: "",
  });

  const fillSeller = (dataSeller) => {
    console.log("data seller en fill seller: ", dataSeller);
    setSellerSend(dataSeller);
    console.log("seller send: ", sellerSend);
  };

  useEffect(() => {
    const fetchSellerById = async () => {
      try {
        const token = localStorage.getItem("token");
        const url = `${SERVICES.GET_SELLER_BY_ID}/${id}`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("data: ", data);
          fillSeller(data);
          console.log("fill pr");
        } else {
          console.error("Error al traer el vendedor:", await response.json());
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    fetchSellerById();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name in sellerSend.personDTO) {
      setSellerSend((prevSeller) => ({
        ...prevSeller,
        personDTO: {
          ...prevSeller.personDTO,
          [name]: value,
        },
      }));
    } else {
      setSellerSend((prevSeller) => ({
        ...prevSeller,
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
      const url = `${SERVICES.MODIFY_SELLER_SERVICE}/${id}`;
      const method = "PUT";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(sellerSend),
      });

      if (response.ok) {
        const data = await response.json();
        handleModalOpen({
          selectedEntity: ENTITIES.VENDEDOR,
          selectedAction: BUTTONS_ACTIONS.MODIFICAR,
          success: true,
        });
        console.log("Vendedor modificado exitosamente:", data);
      } else {
        const errorData = await response.json();
        console.error("Error al modificar el Vendedor:", errorData);
      }
    } catch (error) {
      handleModalOpen({
        selectedEntity: ENTITIES.VENDEDOR,
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
    <div className="seller-section-container">
      <Header pageTitle="Personal" />
      <div className="seller-section">
        {update ? (
          <label className="sellerSection-title">Modificar Vendedor</label>
        ) : (
          <label className="sellerSection-title">Modificar Vendedor</label>
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
                  value={sellerSend.personDTO.firstName}
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
                  value={sellerSend.personDTO.lastName}
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
                  value={sellerSend.personDTO.email}
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
                  value={sellerSend.personDTO.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Información adicional */}
          <div className="sellerForm-section">
            <h3 className="sellerForm-title">Información del proveedor</h3>
            <div className="sellerForm-row">
              <div className="sellerForm-item">
                <label>
                  Tipo de documento <span className="red">*</span>
                </label>
                <select
                  name="documentType"
                  value={sellerSend.documentType}
                  onChange={handleInputChange}
                  required
                  disabled
                >
                  <option>{sellerSend.documentType}</option>
                </select>
              </div>
              <div className="sellerForm-item">
                <label>
                  Número de documento <span className="red">*</span>
                </label>
                <input
                  type="number" //arreglar esto--------------------------------------------------------------!!!!!!
                  name="idPerson"
                  value={sellerSend.personDTO.idPerson}
                  onChange={handleInputChange}
                  required
                  disabled
                />
              </div>
            </div>
            <div className="sellerForm-row">
              <div className="sellerForm-item">
                <label>
                  Usuario <span className="red">*</span>
                </label>
                <input
                  type="text"
                  name="username"
                  value={sellerSend.username}
                  onChange={handleInputChange}
                  required
                  disabled
                />
              </div>
              <div className="sellerForm-item">
                <label>
                  Contraseña <span className="red">*</span>
                </label>
                <input
                  type="text"
                  name="password"
                  value={sellerSend.password}
                  onChange={handleInputChange}
                  required
                  disabled
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
                  value={sellerSend.homeAddress}
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
              : BUTTONS_ACTIONS.MODIFICAR.charAt(0).toUpperCase() +
                BUTTONS_ACTIONS.MODIFICAR.slice(1)}
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

export default ModifySeller;
