import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../Assets/logo2.png";
import Header from "../Header/Header";
import CustomModal from "../../Modales/CustomModal";
import "./FormRegisterDetailsProduct.css";
import {
  USE_PRODUCTS,
  CATEGORY_PRODUCT,
  BUTTONS_ACTIONS,
  SERVICES,
  ENTITIES,
} from "../../Constants/Constants";

const RegisterProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [provider, setProvider] = useState("");
  const [idProvider, setIdProvider] = useState("");
  const [send, setSend] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [entity, setEntity] = useState("producto");
  const [action, setAction] = useState("registrar");
  const [selectedDate, setSelectedDate] = useState("");
  const [product, setProduct] = useState({
    idProduct: id,
    productName: "",
  });

  const [sendProduct, setSendProduct] = useState({
    idProduct: "",
    quantity: "",
    inputUnitPrice: "",
    outputUnitPrice: "",
    iva: "",
    batch: "",
    dueDate: "",
  });

  const [sendProducts, setSendProducts] = useState([
    {
      productDTO: {
        idProduct: "",
      },
      quantity: "",
      inputUnitPrice: "",
      outputUnitPrice: "",
      iva: "",
      batch: "",
      dueDate: "",
    },
  ]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const token = localStorage.getItem("token");
        const url = `${SERVICES.GET_PRODUCT_BY_ID_SERVICE}/${id}`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const productName = data.productName;
          setProduct({ productName: productName });
          setIdProvider(data.idProvider);
        } else {
          console.error("Error al traer el producto:", await response.json());
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };
    fetchProductById();
  }, [id]);

  useEffect(() => {
    const fetchProviderById = async () => {
      try {
        const token = localStorage.getItem("token");
        const url = `${SERVICES.GET_PROVIDER_BY_ID}/${idProvider}`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const providerName = `${data.personDTO.firstName} ${data.personDTO.lastName}`;
          setProvider(providerName);
        } else {
          console.error("Error al traer el vendedor:", await response.json());
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };
    fetchProviderById();
  }, [idProvider]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setSendProduct({
      idProduct: product.idProduct,
      productName: product.productName,
      brand: product.brand,
      category: product.category,
      use: product.use,
      idProvider: id,
      description: product.description,
      unitDTO: {
        unitName: product.unitName,
        description: product.descriptionUnit,
      },
      minimumProductAmount: product.minimumProductAmount,
      maximumProductAmount: product.maximumProductAmount,
    });
    setSend(true);
    setLoading(true);
  };

  useEffect(() => {
    if (send) {
      handleService();
    }
  }, [send]);

  const handleModalOpen = ({ selectedEntity, selectedAction }) => {
    setEntity(selectedEntity);
    setAction(selectedAction);
    setOpenModal(true);
  };

  // Cerrar el modal
  const handleModalClose = () => {
    setProduct({
      idProduct: "",
      productName: "",
      brand: "",
      category: CATEGORY_PRODUCT.PERISHABLE,
      use: USE_PRODUCTS.SUPPLEMENTS,
      idProvider: id,
      description: "",
      unitName: "",
      descriptionUnit: "",
      minimumProductAmount: "",
      maximumProductAmount: "",
    });
    setOpenModal(false);
    setSend(false);
    navigate("/productos");
  };

  const handleService = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(SERVICES.REGISTER_PRODUCT_SERVICE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(sendProduct),
      });

      if (response.ok) {
        handleModalOpen({
          selectedEntity: ENTITIES.PRODUCTO,
          selectedAction: BUTTONS_ACTIONS.REGISTRAR,
          success: true,
        });
        setLoading(false);
        setSend(false);
      } else {
        const errorData = await response.json();
        console.error("Error al registrar el producto:", errorData);
        setLoading(false);
        setSend(false);
      }
    } catch (error) {
      handleModalOpen({
        selectedEntity: ENTITIES.PRODUCTO,
        selectedAction: BUTTONS_ACTIONS.REGISTRAR,
        success: false,
      });
      console.error("Error en la solicitud:", error);
      setLoading(false);
      setSend(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  return (
    <div className="product-section-container">
      <Header pageTitle="Registrar Compra" />
      <div className="steps-section">
        <div className="stepTwo-title-left">
          <label className="step-by-step">Paso 3 de 3</label>
          <label className="step-information-2">Información de la compra</label>
          <label>Proveedor: {provider}</label>
        </div>
      </div>
      <form className="productForm" onSubmit={handleSubmit}>
        <div className="productForm-section">
          <div className="productForm-row">
            <div className="productForm-item">
              <label>
                Identificador del producto <span className="red">*</span>
              </label>
              <input
                type="text"
                name="idProduct"
                value={product.idProduct}
                onChange={handleInputChange}
                disabled
                required
              />
            </div>
            <div className="productForm-item">
              <label>
                Nombre del producto <span className="red">*</span>
              </label>
              <input
                type="text"
                name="productName"
                value={product.productName}
                onChange={handleInputChange}
                disabled
                required
              />
            </div>
          </div>
          <div className="productForm-row">
            <div className="productForm-item">
              <label htmlFor="date-picker">Lote (fecha)</label>
              <input
                type="date"
                id="date-picker"
                value={selectedDate}
                onChange={handleDateChange}
                required
              />
            </div>
            <div className="productForm-item">
              <label>
                Cantidad <span className="red">*</span>
              </label>
              <input
                type="number"
                name="quantity"
                value={sendProduct.quantity}
                onChange={handleInputChange}
                min="1"
                required
              />
            </div>
          </div>
          <div className="productForm-row">
            <div className="productForm-item">
              <label>
                Precio Unitario de entrada <span className="red">*</span>
              </label>
              <input
                type="number"
                name="inputUnitPrice"
                value={sendProduct.inputUnitPrice}
                onChange={handleInputChange}
                min="1"
                required
              />
            </div>
            <div className="productForm-item">
              <label>
                Precio Unitario de salida <span className="red">*</span>
              </label>
              <input
                type="number"
                name="outputUnitPrice"
                value={sendProduct.outputUnitPrice}
                onChange={handleInputChange}
                min="1"
                required
              />
            </div>
          </div>
          <div className="productForm-row">
            <div className="productForm-item">
              <label htmlFor="date-picker">Fecha de vencimiento</label>
              <input
                type="date"
                id="date-picker"
                value={selectedDate}
                onChange={handleDateChange}
                required
              />
            </div>
            <div className="productForm-item">
              <label>
                Porcentaje del IVA <span className="red">*</span>
              </label>
              <input
                type="number"
                name="iva"
                value={sendProduct.iva}
                onChange={handleInputChange}
                min="1"
                required
              />
            </div>
          </div>
        </div>
        <button type="submit" className="provider-button">
          {BUTTONS_ACTIONS.ANADIR.charAt(0).toUpperCase() +
            BUTTONS_ACTIONS.ANADIR.slice(1)}
        </button>
        <img src={logo} alt="logo" className="product-logo" />
        {/* Componente del modal */}
        <CustomModal
          entity={entity}
          action={action}
          openModal={openModal}
          onClose={handleModalClose}
        />
      </form>
    </div>
  );
};

export default RegisterProduct;
