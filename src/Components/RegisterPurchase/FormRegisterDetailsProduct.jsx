import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../Assets/logo2.png";
import Header from "../Header/Header";
import "./FormRegisterDetailsProduct.css";
import {
  BUTTONS_ACTIONS,
  SERVICES,
  CATEGORY_PRODUCT,
} from "../../Constants/Constants";
import PurchaseModal from "../../Modales/PurchaseModal";
import CustomTableBill from "../CustomTableBill/CustomTableBill";
import { ButtonContext } from "../../Context/ButtonContext";
import { ProductContext } from "../../Context/ProductContext";

const RegisterProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [provider, setProvider] = useState("");
  const [idProvider, setIdProvider] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isButtonActive, setIsButtonActive } = useContext(ButtonContext);
  const { sendProducts, addProduct, productsTable, addProductTable } =
    useContext(ProductContext);
  // Estado del producto
  const [product, setProduct] = useState({
    idProduct: id,
    productName: "",
    category: "",
    use: "",
  });

  // Estado del producto a enviar
  const [sendProduct, setSendProduct] = useState({
    idProduct: id,
    quantity: "",
    inputUnitPrice: "",
    outputUnitPrice: "",
    iva: "",
    batch: "",
    dueDate: "",
  });

  // Fetch del producto por ID
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
          setProduct({
            productName: data.productName,
            category: data.category,
            use: data.use,
          });
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

  // Fetch del proveedor por ID
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
          console.error("Error al traer el proveedor:", await response.json());
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };
    if (idProvider) {
      fetchProviderById();
    }
  }, [idProvider]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Crear un nuevo producto basado en el estado actual
    const newProduct = {
      productDTO: {
        idProduct: sendProduct.idProduct,
      },
      quantity: sendProduct.quantity,
      inputUnitPrice: sendProduct.inputUnitPrice,
      outputUnitPrice: sendProduct.outputUnitPrice,
      iva: sendProduct.iva,
      batch: sendProduct.batch,
      dueDate: sendProduct.dueDate,
    };

    const productTable = {
      idProduct: sendProduct.idProduct,
      productName: product.productName,
      category: product.category,
      use: product.use,
      inputUnitPrice: sendProduct.inputUnitPrice,
      quantity: sendProduct.quantity,
      iva: sendProduct.iva,
    };

    // Usar el contexto para agregar el producto
    addProduct(newProduct);
    addProductTable(productTable);
    setIsModalOpen(true);
  };

  const handleServiceAddPurchase = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(SERVICES.ADD_PURCHASE_SERVICE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(sendProducts),
      });

      if (response.ok) {
        navigate("/compra/factura");
      } else {
        const errorData = await response.json();
        console.error("Error al registrar la compra:", errorData);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleViewBill = () => {
    setIsModalOpen(false);
    setIsButtonActive(false);
    handleServiceAddPurchase();
  };

  const handleAddAnother = () => {
    setIsModalOpen(false);
    setIsButtonActive(true);
    navigate(`/compra/productos/${idProvider}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSendProduct((prevProduct) => ({
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
                value={sendProduct.idProduct}
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
              <label htmlFor="date-picker">
                Lote (fecha) <span className="red">*</span>
              </label>
              <input
                type="date"
                name="batch"
                value={sendProduct.batch}
                onChange={handleInputChange}
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
            {product.category !== CATEGORY_PRODUCT.NON_PERISHABLE && (
              <div className="productForm-item">
                <label htmlFor="date-picker">
                  Fecha de vencimiento <span className="red">*</span>
                </label>
                <input
                  type="date"
                  name="dueDate"
                  value={sendProduct.dueDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}
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
        <PurchaseModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onViewBill={handleViewBill}
          onAddAnother={handleAddAnother}
        />
      </form>
    </div>
  );
};

export default RegisterProduct;
