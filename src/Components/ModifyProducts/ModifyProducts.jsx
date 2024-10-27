import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../Assets/logo2.png";
import Header from "../Header/Header";
import "./ModifyProducts.css";
import {
  USE_PRODUCTS,
  CATEGORY_PRODUCT,
  BUTTONS_ACTIONS,
  SERVICES,
} from "../../Constants/Constants";

const ModidyProducts = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [provider, setProvider] = useState("");
  const [product, setProduct] = useState({
    idProduct: id,
    nameProduct: "",
    brand: "",
    use: "",
    category: "",
    unit: "",
    descriptionProduct: "",
    detailsProduct: "",
  });

  useEffect(() => {
    const fetchProviderById = async () => {
      try {
        //AQUI TOCA CAMBIAR EL SERVICIO PARA QUE ME TRAIGA LA INFO DEL PRODUCTO
        const token = localStorage.getItem("token");
        // const url = `${SERVICES.GET_PROVIDER_BY_ID}/${id}`;

        // const response = await fetch(url, {
        //   method: "GET",
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: `Bearer ${token}`,
        //   },
        // });

        // if (response.ok) {
        //   const data = await response.json();
        //   const providerName = `${data.personDTO.firstName} ${data.personDTO.lastName}`;
        //   setProvider(providerName);
        // } else {
        //   console.error("Error al traer el vendedor:", await response.json());
        // }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    fetchProviderById();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setProduct({
      idProduct: id,
      nameProduct: "",
      brand: "",
      use: "",
      category: "",
      unit: "",
      descriptionProduct: "",
      detailsProduct: "",
    });
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
      <Header pageTitle="Productos - Registrar" />
      <div>
        <div className="product-section">
          <label className="product-section-title">
            Agregar Nuevo Producto
          </label>
        </div>
        <div className="steps-section">
          <div className="stepTwo-title-left">
            <label className="step-information-2">
              Información del producto
            </label>
          </div>
          <div className="stepTwo-title-right">
            <label>Proveedor: {provider}</label>
            <button
              className="change-btn"
              onClick={() => navigate("/productos/escoger-proveedor")}
            >
              Cambiar
            </button>
          </div>
        </div>
      </div>
      <form className="productForm" onSubmit={handleSubmit}>
        <div className="productForm-section">
          <div className="productForm-row">
            <div className="productForm-item">
              <label>
                Identificador <span className="red">*</span>
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
                Nombre <span className="red">*</span>
              </label>
              <input
                type="text"
                name="nameProduct"
                value={product.nameProduct}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="productForm-row">
            <div className="productForm-item">
              <label>
                Marca <span className="red">*</span>
              </label>
              <input
                type="text"
                name="brand"
                value={product.brand}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="productForm-item">
              <label>
                Uso <span className="red">*</span>
              </label>
              <select
                name="use"
                value={product.use}
                onChange={handleInputChange}
                required
              >
                <option value={USE_PRODUCTS.SUPPLEMENTS}>Suplementos</option>
                <option value={USE_PRODUCTS.HOMEOPATHIC}>Homeopáticos</option>
                <option value={USE_PRODUCTS.PHYTOTHERAPEUTIC}>
                  Fitoterapéuticos
                </option>
                <option value={USE_PRODUCTS.SPICES}>Especias</option>
                <option value={USE_PRODUCTS.ESOTERIC}>Esotéricos</option>
                <option value={USE_PRODUCTS.PERSONAL_CARE}>
                  Cuidado Personal
                </option>
                <option value={USE_PRODUCTS.OTHER}>Otros</option>
              </select>
            </div>
          </div>
          <div className="productForm-row">
            <div className="productForm-item">
              <label>
                Categoría <span className="red">*</span>
              </label>
              <select
                name="category"
                value={product.category}
                onChange={handleInputChange}
                required
              >
                <option value={CATEGORY_PRODUCT.PERISHABLE}>Perecedero</option>
                <option value={CATEGORY_PRODUCT.NON_PERISHABLE}>
                  No Perecedero
                </option>
              </select>
            </div>
            <div className="productForm-item">
              <label>
                Unidad <span className="red">*</span>
              </label>
              <input
                type="text"
                name="unit"
                value={product.unit}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="productForm-row">
            <div className="productForm-item">
              <label>
                Descripción <span className="red">*</span>
              </label>
              <textarea
                className="custom-textarea"
                name="descriptionProduct"
                value={product.descriptionProduct}
                rows="4"
                cols="40"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="productForm-item">
              <label>Detalles</label>
              <textarea
                className="custom-textarea"
                name="detailsProduct"
                value={product.detailsProduct}
                rows="4"
                cols="40"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <button type="submit" className="provider-button">
          {BUTTONS_ACTIONS.MODIFICAR.charAt(0).toUpperCase() +
            BUTTONS_ACTIONS.MODIFICAR.slice(1)}
        </button>
        <img src={logo} alt="logo" className="product-logo" />
      </form>
    </div>
  );
};

export default ModidyProducts;
