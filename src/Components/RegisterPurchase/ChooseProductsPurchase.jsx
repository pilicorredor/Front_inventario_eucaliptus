import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomTable from "../CustomTable/CustomTable.jsx";
import SearchIcon from "@mui/icons-material/Search";
import "./ChooseProductsPurchase.css";
import Header from "../Header/Header.jsx";
import {
  SERVICES,
  CATEGORY_PRODUCT,
  ENTITIES,
} from "../../Constants/Constants.js";
import { ButtonContext } from "../../Context/ButtonContext";
import Dropdown from "../Dropdown/Dropdown.jsx";
import DropdownItem from "../DropdownItem/DropdownItem.jsx";
import { ProductContext } from "../../Context/ProductContext";
import RegisterProductModal from "../../Modales/RegisterProductModal.jsx";

const ChooseProductsPurchase = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryProd, setCategoryProd] = useState(
    CATEGORY_PRODUCT.ALL_PRODUCTS
  );
  const [productsData, setProductsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [useButtonText, setUseButtonText] = useState("TODOS");
  const [productButtonText, setProductButtonText] = useState("Buscar por...");
  const [selectedUseFilter, setSelectedUseFilter] = useState("");
  const [selectedSearchFilter, setSelectedSearchFilter] = useState("");
  const [contextTable, setContextTable] = useState("registerPurchaseAddProd");
  const { isButtonActive, setIsButtonActive } = useContext(ButtonContext);
  const [provider, setProvider] = useState("");
  const { sendProducts, addProduct, productsTable, addProductTable } =
    useContext(ProductContext);
  const columnsProducts = [
    "idProduct",
    "productName",
    "brand",
    "categoryProduct",
    "useProduct",
    "unitName",
    "unitDescription",
  ];

  useEffect(() => {
    fetchProductsData();
  }, []);

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
  }, [id]);

  const fetchProductsData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${SERVICES.GET_PRODUCT_BY_PROVIDER_SERVICE}/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const formattedProducts = data.map((product) => ({
          id_modify: product.idProduct,
          idProduct: product.idProduct,
          productName: product.productName,
          brand: product.brand,
          categoryProduct: product.category,
          useProduct: product.use,
          idProvider: product.idProvider,
          unitName: product.unitDTO.unitName,
          unitDescription: product.unitDTO.description,
          minimumProductAmount: product.minimumProductAmount,
          maximumProductAmount: product.maximumProductAmount,
        }));
        setProductsData(formattedProducts);
        setFilteredData(formattedProducts);
      } else {
        const errorMessage = await response.text();
        console.error("Error al obtener los productos:", errorMessage);
      }
    } catch (error) {
      console.error("Error en la solicitud de productos:", error);
    }
  };

  const availableUses = [
    "TODOS",
    "SUPLEMENTOS",
    "HOMEOPATICOS",
    "FITOTERAPEUTICOS",
    "ESPECIAS",
    "ESOTERICOS",
    "CUIDADO_PERSONAL",
    "OTROS",
  ];

  const productItems = [
    "ID del producto",
    "Nombre",
    "Marca",
    "Categoría",
    "Uso",
    "Unidad",
    "Descripción unidad",
  ];

  useEffect(() => {
    handleUpdateData(categoryProd, selectedUseFilter);
  }, [categoryProd, selectedUseFilter, productsData]);

  const handleCategoryChange = (selectedCategory) => {
    setCategoryProd(selectedCategory);
  };

  const handleSearch = () => {
    console.log("Buscar:", searchQuery);
  };

  const handleUpdateData = (categoryProd, selectedUse) => {
    let filteredProducts = productsData;

    if (categoryProd !== CATEGORY_PRODUCT.ALL_PRODUCTS) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          (categoryProd === CATEGORY_PRODUCT.PERISHABLE &&
            product.categoryProduct === "PERECEDERO") ||
          (categoryProd === CATEGORY_PRODUCT.NON_PERISHABLE &&
            product.categoryProduct === "NO_PERECEDERO")
      );
    }

    if (selectedUse && selectedUse !== "TODOS") {
      filteredProducts = filteredProducts.filter(
        (product) => product.useProduct === selectedUse
      );
    }
    setFilteredData(filteredProducts);
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

  const handleUseFilterSelection = (selectedItem) => {
    setSelectedUseFilter(selectedItem);
    setUseButtonText(selectedItem);
  };

  const handleSearchFilterSelection = (selectedItem) => {
    setSelectedSearchFilter(selectedItem);
    setProductButtonText(selectedItem);
  };

  const handleFinishPurchase = () => {
    setIsButtonActive(false);
    handleServiceAddPurchase();
  };

  const handleNewButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    fetchProductsData();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
  };

  return (
    <div className="products">
      <Header pageTitle="Registrar Compra" />
      <div>
        <div className="steps-section">
          <div className="stepTwo-title-left">
            <label className="step-by-step">Paso 2 de 3</label>
            <label className="step-information-2">
              Seleccionar producto a agregar
            </label>
          </div>
          <div className="stepTwo-title-right">
            <label>Proveedor: {provider}</label>
            {!isButtonActive && (
              <button
                className="change-btn"
                onClick={() => navigate("/compra/proveedor")}
              >
                Cambiar
              </button>
            )}
          </div>
        </div>
        <div className="products-header">
          <button
            onClick={() => handleCategoryChange(CATEGORY_PRODUCT.ALL_PRODUCTS)}
            className={
              categoryProd === CATEGORY_PRODUCT.ALL_PRODUCTS ? "selected" : ""
            }
          >
            Todos
          </button>
          <button
            onClick={() => handleCategoryChange(CATEGORY_PRODUCT.PERISHABLE)}
            className={
              categoryProd === CATEGORY_PRODUCT.PERISHABLE ? "selected" : ""
            }
          >
            Perecederos
          </button>
          <button
            onClick={() =>
              handleCategoryChange(CATEGORY_PRODUCT.NON_PERISHABLE)
            }
            className={
              categoryProd === CATEGORY_PRODUCT.NON_PERISHABLE ? "selected" : ""
            }
          >
            No Perecederos
          </button>
        </div>

        <div className="search-bar">
          <div className="search-container">
            <Dropdown
              buttonText={productButtonText}
              content={
                <>
                  {" "}
                  {productItems.map((item) => (
                    <DropdownItem
                      key={item}
                      onClick={() => handleSearchFilterSelection(item)}
                    >
                      {`${item}`}
                    </DropdownItem>
                  ))}{" "}
                </>
              }
            />
            <input
              type="text"
              placeholder="Ingresa tu búsqueda"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <SearchIcon className="search-icon" />
            <button className="btn search-btn" onClick={handleSearch}>
              Buscar
            </button>
          </div>
          <button className="btn new-btn" onClick={handleNewButtonClick}>
            Nuevo
          </button>
        </div>

        {/* Nuevo filtro por uso */}
        <div className="filter-use">
          <label>Filtrar por:</label>
          <Dropdown
            buttonText={useButtonText}
            content={
              <>
                {" "}
                {availableUses.map((item) => (
                  <DropdownItem
                    key={item}
                    onClick={() => handleUseFilterSelection(item)}
                  >
                    {`${item}`}
                  </DropdownItem>
                ))}{" "}
              </>
            }
          />
        </div>

        <div className="products-content">
          <CustomTable
            data={filteredData}
            customColumns={columnsProducts}
            handleUpdateData={handleUpdateData}
            role={ENTITIES.PRODUCTO}
            fetchProductsData={fetchProductsData}
            context={contextTable}
          />
        </div>
      </div>
      {/* Botón "Terminar compra" solo si isButtonActive es true */}
      {isButtonActive && (
        <div className="finish-purchase-btn-container">
          <button
            className="finish-purchase-btn"
            onClick={handleFinishPurchase}
          >
            Terminar compra
          </button>
        </div>
      )}
      {/* Modal de Proveedor */}
      <RegisterProductModal
        id={id}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default ChooseProductsPurchase;
