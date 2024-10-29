import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomTable from "../CustomTable/CustomTable";
import SearchIcon from "@mui/icons-material/Search";
import "./Products.css";
import Header from "../Header/Header.jsx";
import {
  SERVICES,
  CATEGORY_PRODUCT,
  ENTITIES,
} from "../../Constants/Constants";

import Dropdown from "../Dropdown/Dropdown.jsx";
import DropdownItem from "../DropdownItem/DropdownItem.jsx";

const Products = () => {
  const navigate = useNavigate();
  const [categoryProd, setCategoryProd] = useState(
    CATEGORY_PRODUCT.ALL_PRODUCTS
  );
  const [productsData, setProductsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUse, setSelectedUse] = useState("Todos");
  const [useButtonText, setUseButtonText] = useState('Filtrar por uso:');
  const [productButtonText, setProductButtonText] = useState('Buscar por...');
  const [selectedUseFilter, setSelectedUseFilter] = useState('');
  const [selectedSearchFilter, setSelectedSearchFilter] = useState('');




  const productsList = [
    {
      id_modify: "SUP12",
      nameProduct: "Suplemento con Ganoderma",
      brand: "DXN",
      category: "No Perecedero",
      use: "Suplementos",
      provider: "Proveedor A",
    },
    {
      id_modify: "OTR42",
      nameProduct: "Spirulina",
      brand: "Naturela",
      category: "No Perecedero",
      use: "Otro",
      provider: "Proveedor B",
    },
    {
      id_modify: "ES201",
      nameProduct: "Cacao Latte Con Maca",
      brand: "NatuYerb",
      category: "Perecedero",
      use: "Especias",
      provider: "Proveedor C",
    },
    {
      id_modify: "CP156",
      nameProduct: "Jabon de menta con extracto de avena puramente",
      brand: "Puramente",
      category: "No Perecedero",
      use: "Cuidado Personal",
      provider: "Proveedor D",
    },
  ];

  const availableUses = [
    "Todos",
    "Suplementos",
    "Homeopáticos",
    "Fitoterapéuticos",
    "Especias",
    "Esotéricos",
    "Cuidado Personal",
    "Otro",
  ];

  const productItems = [
    "Nombre",
    "Marca",
    "Categoría",
    "Uso",
    "Proveedor",
  ];

  useEffect(() => {
    handleUpdateData(categoryProd, selectedUse);
  }, [categoryProd, selectedUse]);

  const handleCategoryChange = (selectedCategory) => {
    setCategoryProd(selectedCategory);
  };

  const handleUseChange = (event) => {
    setSelectedUse(event.target.value);
  };

  const columsProducts = [
    "nameProduct",
    "brand",
    "category",
    "use",
    "provider",
  ];

  const handleSearch = () => {
    console.log("Buscar:", searchQuery);
  };

  const handleNew = () => {
    navigate(`/productos/escoger-proveedor`);
  };

  const handleUpdateData = (categoryProd, selectedUse) => {
    let filteredProducts = productsList;

    if (categoryProd !== CATEGORY_PRODUCT.ALL_PRODUCTS) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          (categoryProd === CATEGORY_PRODUCT.PERISHABLE &&
            product.category === "Perecedero") ||
          (categoryProd === CATEGORY_PRODUCT.NON_PERISHABLE &&
            product.category === "No Perecedero")
      );
    }

    if (selectedUse !== "Todos") {
      filteredProducts = filteredProducts.filter(
        (product) => product.use === selectedUse
      );
    }

    setProductsData(filteredProducts);
  };

  const handleUseFilterSelection = (selectedItem) => {
    setSelectedUseFilter(selectedItem);
    setUseButtonText(selectedItem);
  };

  const handleSearchFilterSelection = (selectedItem) => {
    setSelectedSearchFilter(selectedItem);
    setProductButtonText(selectedItem);
  };

  return (
    <div className="products">
      <Header pageTitle="Productos" />
      <div>
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
            <Dropdown buttonText={productButtonText} content={
              <> {
                productItems.map(
                  item =>
                    <DropdownItem key={item} onClick={() => handleSearchFilterSelection(item)}>
                      {`${item}`}
                    </DropdownItem>)} </>} />
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
          <button className="btn new-btn" onClick={handleNew}>
            Nuevo
          </button>
        </div>

        {/* Nuevo filtro por uso */}
        <div className="filter-use">
          <Dropdown buttonText={useButtonText} content={
            <> {availableUses.map(
              item =>
                <DropdownItem key={item} onClick={() => handleUseFilterSelection(item)}>
                  {`${item}`}
                </DropdownItem>)} </>} />
        </div>

        <div className="products-content">
          <CustomTable
            data={productsData}
            customColumns={columsProducts}
            handleUpdateData={handleUpdateData}
            role={ENTITIES.PRODUCTO}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
