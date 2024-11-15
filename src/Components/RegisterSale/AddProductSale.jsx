import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomTableSale from "../CustomTableSale/CustomTableSale.jsx";
import SummaryTable from "../CustomTableSale/SummaryTable.jsx";
import SearchIcon from "@mui/icons-material/Search";
import Header from "../Header/Header.jsx";
import { SERVICES } from "../../Constants/Constants.js";
import Dropdown from "../Dropdown/Dropdown.jsx";
import DropdownItem from "../DropdownItem/DropdownItem.jsx";
import "./AddProductSale.css";

const AddProductSale = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [productButtonText, setProductButtonText] = useState("Buscar por...");
  const [filteredData, setFilteredData] = useState([]);
  const [summaryData, setSummaryData] = useState([]);

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(SERVICES.GET_ALL_PRODUCTS, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          const formattedProducts = data.map((product) => ({
            id_modify: product.idProduct,
            idProduct: product.idProduct,
            productName: product.productName,
            quantity: product.maximumProductAmount,
            useProduct: product.use,
          }));
          setFilteredData(formattedProducts);
        } else {
          const errorMessage = await response.text();
          console.error("Error al obtener los productos:", errorMessage);
        }
      } catch (error) {
        console.error("Error en la solicitud de productos:", error);
      }
    };

    fetchProductsData();
  }, []);

  const columnsProducts = ["idProduct", "productName", "quantity"];
  const productItems = ["ID del producto", "Nombre", "Cantidad"];

  const handleSearch = () => {
    //TODO: Agrega la lógica de búsqueda aquí
  };

  const handleSearchFilterSelection = (selectedItem) => {
    setProductButtonText(selectedItem);
  };

  const handleAddToSummary = (product, quantitySelected) => {
    setSummaryData((prevSummary) => {
      const existingProduct = prevSummary.find(
        (item) => item.id === product.id_modify
      );
      if (existingProduct) {
        // Actualiza la cantidad si ya existe
        return prevSummary.map((item) =>
          item.id === product.id_modify
            ? { ...item, quantitySelected: quantitySelected }
            : item
        );
      }
      return [
        ...prevSummary,
        {
          id_modify: product.id_modify,
          idProduct: product.id_modify,
          productName: product.productName,
          categoryProduct: product.categoryProduct,
          useProduct: product.useProduct,
          unitPrice: 10000,
          quantitySelected,
          //subTotal: product.unitPrice * quantitySelected,
          subTotal: 10000 * quantitySelected,
        },
      ];
    });
  };

  const handleRemoveFromSummary = (id) => {
    setSummaryData((prevSummary) =>
      prevSummary.filter((item) => item.id_modify !== id)
    );
  };

  const handleNextSale = () => {
    navigate("/registrar-venta", { state: { summaryData } });
  };

  return (
    <div className="products-sale">
      <Header pageTitle="Nueva Venta" />
      <div>
        <div className="steps-section-sale">
          <label className="step-by-step">Paso 1 de 2</label>
          <label className="step-information">Seleccionar productos</label>
        </div>
        <div className="search-bar">
          <div className="search-container">
            <Dropdown
              buttonText={productButtonText}
              content={
                <>
                  {productItems.map((item) => (
                    <DropdownItem
                      key={item}
                      onClick={() => handleSearchFilterSelection(item)}
                    >
                      {`${item}`}
                    </DropdownItem>
                  ))}
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
        </div>

        <div className="products-sale-content">
          <CustomTableSale
            widthTable={"70%"}
            dataProducts={filteredData}
            customColumns={columnsProducts}
            onAddToSummary={handleAddToSummary}
            isNewSale={true}
          />
          <SummaryTable
            summaryData={summaryData}
            onRemove={handleRemoveFromSummary}
          />
        </div>
        <div className="next-sale-btn-container">
          <button
            className="next-sale-btn"
            onClick={handleNextSale}
            disabled={summaryData.length === 0}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductSale;
