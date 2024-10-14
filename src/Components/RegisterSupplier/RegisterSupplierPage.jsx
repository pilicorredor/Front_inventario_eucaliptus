import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterSupplier.css";
import logo from "../Assets/logo2.png";
import CustomModal from "../../Modales/CustomModal";
import { BUTTONS_ACTIONS, ENTITIES } from "../../Constants/Constants";

const RegistrarProveedor = ({ providerData }) => {
  const navigate = useNavigate();
  const [provider, setProvider] = useState({
    nombres: "",
    apellidos: "",
    email: "",
    teléfono: "",
    tipo: "Natural",
    documento: "",
    empresa: "",
    teléfonoEmpresa: "",
    emailEmpresa: "",
    direccionEmpresa: "",
    nombreBanco: "",
    numeroCuenta: "",
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
    setOpenModal(false);
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

    // Abrir el modal después de intentar registrar o modificar
    handleModalOpen({
      selectedEntity: ENTITIES.PROVEEDOR,
      selectedAction: update
        ? BUTTONS_ACTIONS.MODIFICAR
        : BUTTONS_ACTIONS.REGISTRAR,
    });

    // Limpiar el formulario
    setProvider({
      nombres: "",
      apellidos: "",
      email: "",
      teléfono: "",
      tipo: "Natural",
      documento: "",
      empresa: "",
      teléfonoEmpresa: "",
      emailEmpresa: "",
      direccionEmpresa: "",
      nombreBanco: "",
      numeroCuenta: "",
    });
  };

  return (
    <div className="provider-section">
      {update ? (
        <label className="providerSection-title">Modificar Proveedor</label>
      ) : (
        <label className="providerSection-title">Agregar Nuevo Proveedor</label>
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
                name="nombres"
                value={provider.nombres}
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
                name="apellidos"
                value={provider.apellidos}
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
                name="teléfono"
                value={provider.teléfono}
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
                name="tipo"
                value={provider.tipo}
                onChange={handleInputChange}
                required
              >
                <option value="Natural">Natural</option>
                <option value="Jurídica">Jurídica</option>
              </select>
            </div>
            <div className="providerForm-item">
              <label>
                Número de documento (NIT o cédula){" "}
                <span className="red">*</span>
              </label>
              <input
                type="number"
                name="documento"
                value={provider.documento}
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
                name="empresa"
                value={provider.empresa}
                onChange={handleInputChange}
              />
            </div>
            <div className="providerForm-item">
              <label>Teléfono de la empresa</label>
              <input
                type="text"
                name="teléfonoEmpresa"
                value={provider.teléfonoEmpresa}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="providerForm-row">
            <div className="providerForm-item">
              <label>Correo electrónico de la empresa</label>
              <input
                type="email"
                name="emailEmpresa"
                value={provider.emailEmpresa}
                onChange={handleInputChange}
              />
            </div>
            <div className="providerForm-item">
              <label>
                Dirección de la empresa <span className="red">*</span>
              </label>
              <input
                type="text"
                name="direccionEmpresa"
                value={provider.direccionEmpresa}
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
                name="nombreBanco"
                value={provider.nombreBanco}
                onChange={handleInputChange}
              />
            </div>
            <div className="providerForm-item">
              <label>
                Número de cuenta <span className="red">*</span>
              </label>
              <input
                type="number"
                name="numeroCuenta"
                value={provider.numeroCuenta}
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
  );
};

export default RegistrarProveedor;
