import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterSeller.css";
import logo from "../Assets/logo2.png";
import CustomModal from "../../Modales/CustomModal";
import { BUTTONS_ACTIONS, ENTITIES } from "../../Constants/Constants";

const RegistrarVendedor = ({ sellerData }) => {
  const navigate = useNavigate();
  const [seller, setSeller] = useState({
    nombres: "",
    apellidos: "",
    email: "",
    teléfono: "",
    tipo: "cedula",
    documento: "",
    usuario: "",
    contraseña: "",
    direccion: "",
  });

  const [update, setUpdate] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [entity, setEntity] = useState("vendedor");
  const [action, setAction] = useState("registrar");

  // Abrir el modal con la entidad y acción correspondientes
  const handleModalOpen = ({ selectedEntity, selectedAction }) => {
    setEntity(selectedEntity);
    setAction(selectedAction);
    setOpenModal(true);
  };

  // Cerrar el modal
  const handleModalClose = () => {
    setOpenModal(false);
    // Redirigir solo después de cerrar el modal
    navigate("/personal");
  };

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

    handleModalOpen({
      selectedEntity: ENTITIES.VENDEDOR,
      selectedAction: update
        ? BUTTONS_ACTIONS.MODIFICAR
        : BUTTONS_ACTIONS.REGISTRAR,
    });

    // Limpiar el formulario
    setSeller({
      nombres: "",
      apellidos: "",
      email: "",
      teléfono: "",
      tipo: "cedula",
      documento: "",
      usuario: "",
      contraseña: "",
      direccion: "",
    });
  };

  return (
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
                name="nombres"
                value={seller.nombres}
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
                name="apellidos"
                value={seller.apellidos}
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
                name="teléfono"
                value={seller.teléfono}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Información adicional */}
        <div className="sellerForm-section">
          <h3 className="sellerForm-title">Información del Vendedor</h3>
          <div className="sellerForm-row">
            <div className="sellerForm-item">
              <label>
                Tipo de documento <span className="red">*</span>
              </label>
              <select
                name="tipo"
                value={seller.tipo}
                onChange={handleInputChange}
                required
              >
                <option value="cedula">Cedula de ciudadanía</option>
                <option value="pasaporte">Pasaporte</option>
              </select>
            </div>
            <div className="sellerForm-item">
              <label>
                Número de documento <span className="red">*</span>
              </label>
              <input
                type="number"
                name="documento"
                value={seller.documento}
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
                name="usuario"
                value={seller.usuario}
                onChange={handleInputChange}
              />
            </div>
            <div className="sellerForm-item">
              <label>Contraseña</label>
              <input
                type="number"
                name="contraseña"
                value={seller.contraseña}
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
                name="direccionEmpresa"
                value={seller.direccion}
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

        {/* Componente del modal */}
        <CustomModal
          entity={entity}
          action={action}
          openModal={openModal}
          onClose={handleModalClose} // Cierra el modal y redirige
        />
      </form>
    </div>
  );
};

export default RegistrarVendedor;
