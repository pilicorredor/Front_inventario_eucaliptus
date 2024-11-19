import React, { useState, useEffect } from "react";
import CustomTable from "../CustomTable/CustomTable";
import SearchIcon from "@mui/icons-material/Search";
import Header from "../Header/Header.jsx";
import { SERVICES, REPORT_PERIOD } from "../../Constants/Constants";
import "./ReportPage.css";
import Dropdown from "../Dropdown/Dropdown.jsx";
import DropdownItem from "../DropdownItem/DropdownItem.jsx";

const ReportPage = () => {
  const [periodReport, setPeriodReport] = useState(REPORT_PERIOD.DAILY);
  const [productsData, setProductsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(""); // Estado para la fecha seleccionada
  const [productButtonText, setProductButtonText] = useState("Buscar por...");
  const [selectedUseFilter, setSelectedUseFilter] = useState("");
  const [selectedSearchFilter, setSelectedSearchFilter] = useState("");

  const columnsProducts = [
    "idProduct",
    "productName",
    "categoryProduct",
    "useProduct",
    "quantity",
    "priceUnit",
    "subTotal",
  ];

  useEffect(() => {
    // Llamar la función de reportes del día actual
  }, []);

  const productItems = [
    "ID del producto",
    "Nombre",
    "Categoría",
    "Uso",
    "Cantidad",
    "Precio Unitario",
    "Sub Total",
  ];

  useEffect(() => {
    handleUpdateData(periodReport, selectedUseFilter);
  }, [periodReport, selectedUseFilter, productsData]);

  const handleReportChange = (selectedPeriod) => {
    setPeriodReport(selectedPeriod);
  };

  const handleSearch = () => {
    console.log("Buscar:", searchQuery, "Fecha seleccionada:", selectedDate);
  };

  const handleUpdateData = (periodReport) => {
    let filteredProducts = productsData;
    setFilteredData(filteredProducts);
  };

  const handleUseFilterSelection = (selectedItem) => {
    setSelectedUseFilter(selectedItem);
  };

  const handleSearchFilterSelection = (selectedItem) => {
    setSelectedSearchFilter(selectedItem);
    setProductButtonText(selectedItem);
  };

  const handleDateChange = (event) => {
    const selected = event.target.value;
    setSelectedDate(selected);
  };

  return (
    <div className="reports-page">
      <Header pageTitle="Reportes" />
      <div>
        <div className="reports-header">
          <button
            onClick={() => handleReportChange(REPORT_PERIOD.DAILY)}
            className={periodReport === REPORT_PERIOD.DAILY ? "selected" : ""}
          >
            Diario
          </button>
          <button
            onClick={() => handleReportChange(REPORT_PERIOD.WEEKLY)}
            className={periodReport === REPORT_PERIOD.WEEKLY ? "selected" : ""}
          >
            Semanal
          </button>
          <button
            onClick={() => handleReportChange(REPORT_PERIOD.MONTHLY)}
            className={periodReport === REPORT_PERIOD.MONTHLY ? "selected" : ""}
          >
            Mensual
          </button>
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

        <div className="calendar-container">
          <div className="calenar-input-container">
            <label htmlFor="date-picker">Escoger período:</label>
            <input
              type="date"
              name="selectedDate"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>
          <button className="btn search-btn" onClick={handleSearch}>
            Buscar
          </button>
        </div>

        <div className="reports-content">
          <CustomTable
            data={filteredData}
            customColumns={columnsProducts}
            handleUpdateData={handleUpdateData}
            context={"report"}
          />
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
