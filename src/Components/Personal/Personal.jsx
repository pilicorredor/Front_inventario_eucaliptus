import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomTable from "../CustomTable/CustomTable";
import SearchIcon from "@mui/icons-material/Search";
import "./Personal.css";
import Header from "../Header/Header.jsx";
import { SERVICES, ENTITIES } from "../../Constants/Constants";

const Personal = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("proveedor");
  const [searchQuery, setSearchQuery] = useState("");
  const [providersData, setProvidersData] = useState([]);
  const [sellersData, setSellersData] = useState([]);

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
          id: seller.personDTO.idPerson,
          nombre: `${seller.personDTO.firstName} ${seller.personDTO.lastName}`,
          direccion: seller.homeAddress,
          correo_electronico: seller.personDTO.email,
          telefono: seller.personDTO.phoneNumber,
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
          id: provider.personDTO.idPerson,
          nombre: `${provider.personDTO.firstName} ${provider.personDTO.lastName}`,
          direccion: provider.companyDTO.companyAddress,
          correo_electronico: provider.personDTO.email,
          telefono: provider.personDTO.phoneNumber,
          empresa: provider.companyDTO.companyName,
          cuenta: provider.companyDTO.bankAccountNumber,
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

  const columnsProviders = [
    "id",
    "nombre",
    "direccion",
    "correo_electronico",
    "telefono",
    "empresa",
    "cuenta",
  ];

  const columnsSellers = [
    "id",
    "nombre",
    "direccion",
    "correo_electronico",
    "telefono",
  ];

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
    navigate(`/personal/${selectedRole}`);
  };

  const handleSearch = () => {
    console.log("Buscar:", searchQuery);
  };

  const handleNew = () => {
    navigate(`/registrar-${role}`);
  };

  const handleDelete = () => {};

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
          {role === "proveedor" && (
            <CustomTable
              data={providersData}
              customColumns={columnsProviders}
              role={role}
              onDelete={handleDelete}
              handleUpdateData={handleUpdateData}
            />
          )}
          {role === "vendedor" && (
            <CustomTable
              data={sellersData}
              customColumns={columnsSellers}
              role={role}
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
