import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomTable from "../CustomTable/CustomTable";
import SearchIcon from "@mui/icons-material/Search";
import "./Personal.css";
import Header from "../Header/Header.jsx";
import { SERVICES, ENTITIES } from "../../Constants/Constants";
import Dropdown from "../Dropdown/Dropdown.jsx";
import DropdownItem from "../DropdownItem/DropdownItem.jsx";

const Personal = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("proveedor");
  const [searchQuery, setSearchQuery] = useState("");
  const [providersData, setProvidersData] = useState([]);
  const [sellersData, setSellersData] = useState([]);
  const [buttonText, setButtonText] = useState("Buscar por...");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [filteredProviderData, setFilteredProviderData] = useState([]);


  const columnsProviders = [
    "name",
    "addressCompany",
    "email",
    "phoneNumber",
    "companyName",
    "banckAccount",
  ];

  const columnsSellers = ["name", "homeAddress", "email", "phoneNumber"];

  const providerItems = [
    "Todos",
    "Nombre",
    "Dirección Empresarial",
    "Correo Electrónico",
    "Número de Teléfono",
    "Nombre de la Empresa",
    "Cuenta Bancaria",
  ];

  const sellerItems = [
    "Todos",
    "Nombre",
    "Dirección de domicilio",
    "Correo Electrónico",
    "Número de Teléfono",
  ];

  const providerColumnMap = {
    "Nombre": "name",
    "Dirección Empresarial": "addressCompany",
    "Correo Electrónico": "email",
    "Número de Teléfono": "phoneNumber",
    "Nombre de la Empresa": "companyName",
    "Cuenta Bancaria": "banckAccount",
  };

  const sellerColumnMap = {
    "Nombre": "name",
    "Dirección de domicilio": "homeAddress",
    "Correo Electrónico": "email",
    "Número de Teléfono": "phoneNumber",
  }

  useEffect(() => {
    if (role === "vendedor") {
      fetchSellersData();
    } else if (role === "proveedor") {
      fetchProvidersData();
    }
  }, [role, sellersData]);

  const fetchSellersData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(SERVICES.GET_SELLERS_ALL_SERVICE, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const formattedSellers = data.map((seller) => ({
          id_modify: seller.idSeller,
          name: `${seller.personDTO.firstName} ${seller.personDTO.lastName}`,
          homeAddress: seller.homeAddress,
          email: seller.personDTO.email,
          phoneNumber: seller.personDTO.phoneNumber,
        }));
        setSellersData(formattedSellers);
      } else {
        const errorMessage = await response.text();
        console.error("Error al obtener los vendedores:", errorMessage);
      }
    } catch (error) {
      console.error("Error en la solicitud de vendedores:", error);
    }
  };

  const fetchProvidersData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(SERVICES.GET_PROVIDERS_ALL_SERVICE, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const formattedProviders = data.map((provider) => ({
          id_modify: provider.idProvider,
          name: `${provider.personDTO.firstName} ${provider.personDTO.lastName}`,
          addressCompany: provider.companyDTO.companyAddress,
          email: provider.personDTO.email,
          phoneNumber: provider.personDTO.phoneNumber,
          companyName: provider.companyDTO.companyName,
          banckAccount: provider.companyDTO.bankAccountNumber,
        }));
        setProvidersData(formattedProviders);
      } else {
        const errorMessage = await response.text();
        console.error("Error al obtener los vendedores:", errorMessage);
      }
    } catch (error) {
      console.error("Error en la solicitud de vendedores:", error);
    }
  };

  const handleUpdateData = (role) => {
    if (role === ENTITIES.VENDEDOR) {
      fetchSellersData();
    } else if (role === ENTITIES.PROVEEDOR) {
      fetchProvidersData();
    }
  };

  const handleRoleChange = (selectedRole) => {
    setSearchQuery("");
    setFilteredData(selectedRole === "proveedor" ? providersData : sellersData)
    setRole(selectedRole);
    navigate(`/personal/${selectedRole}`);
  };

  const handleSearch = () => {
    if (role === "proveedor") {  
      if (!searchQuery || selectedFilter === "Todos") {
      
        setFilteredProviderData(providersData);
        return;
      }
      const selectedColumn = providerColumnMap[selectedFilter];

      if (!selectedColumn) {
        console.warn("No se ha seleccionado una columna válida para la búsqueda.");
        return;
      }
  
      const filteredResults = providersData.filter((provider) =>
        provider[selectedColumn]
          .toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
  
      setFilteredProviderData(filteredResults);
    } else {
      if (!searchQuery || selectedFilter === "Todos") {
      
        setFilteredData(sellersData);
        return;
      }
      const selectedColumn = sellerColumnMap[selectedFilter];

      if (!selectedColumn) {
        console.warn("No se ha seleccionado una columna válida para la búsqueda.");
        return;
      }
  
      const filteredResults = sellersData.filter((seller) =>
        seller[selectedColumn]
          .toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
  
      setFilteredData(filteredResults);
    }
  };

  const handleNew = () => {
    navigate(`/registrar-${role}`);
  };

  const handleDelete = () => {};

  const handleFilterSelection = (selectedItem) => {
    setSelectedFilter(selectedItem);
    setButtonText(selectedItem);

    if (selectedItem === "Todos") {
      setSearchQuery("");
      setFilteredProviderData(providersData);
      setFilteredData(sellersData);
    }
  };

  return (
    <div className="personal">
      <Header pageTitle="Personal" />
      <div>
        <div className="personal-header">
          <button
            onClick={() => handleRoleChange("proveedor")}
            className={role === "proveedor" ? "selected" : ""}
          >
            Proveedores
          </button>
          <button
            onClick={() => handleRoleChange("vendedor")}
            className={role === "vendedor" ? "selected" : ""}
          >
            Vendedores
          </button>
        </div>

        <div className="search-bar">
          <div className="search-container">

            <Dropdown
              buttonText={buttonText}
              content={
                role === "proveedor" ? (
                  <>
                    {" "}
                    {providerItems.map((item) => (
                      <DropdownItem
                        key={item}
                        onClick={() => handleFilterSelection(item)}
                      >
                        {`${item}`}
                      </DropdownItem>
                    ))}{" "}
                  </>
                ) : (
                  <>
                    {" "}
                    {sellerItems.map((item) => (
                      <DropdownItem
                        key={item}
                        onClick={() => handleFilterSelection(item)}
                      >
                        {`${item}`}
                      </DropdownItem>
                    ))}{" "}
                  </>
                )
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
          <button className="btn new-btn" onClick={handleNew}>
            Nuevo
          </button>
        </div>

        <div className="personal-content">
          {role === ENTITIES.PROVEEDOR && (
            <CustomTable
              data={searchQuery? filteredProviderData : providersData}
              customColumns={columnsProviders}
              role={ENTITIES.PROVEEDOR}
              onDelete={handleDelete}
              handleUpdateData={handleUpdateData}
            />
          )}
          {role === ENTITIES.VENDEDOR && (
            <CustomTable
              data={searchQuery? filteredData : sellersData}
              customColumns={columnsSellers}
              role={ENTITIES.VENDEDOR}
              onDelete={handleDelete}
              handleUpdateData={handleUpdateData}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Personal;
