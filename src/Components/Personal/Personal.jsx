import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomTable from "../CustomTable/CustomTable";
import SearchIcon from "@mui/icons-material/Search";
import "./Personal.css";
import RegistrarProveedor from "../RegisterSupplier/RegisterSupplierPage";

const Personal = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("proveedores");
  const [searchQuery, setSearchQuery] = useState("");

  //Datos de prueba
  const proveedores = [
    {
      id: 1,
      nombre: "Proveedor 1",
      direccion: "Dirección 1",
      email: "email1@proveedor.com",
      telefono: "1234567890",
      empresa: "Empresa 1",
      cuenta: "1234",
    },
    {
      id: 2,
      nombre: "Proveedor 2",
      direccion: "Dirección 2",
      email: "email2@proveedor.com",
      telefono: "0987654321",
      empresa: "Empresa 2",
      cuenta: "5678",
    },
    {
      id: 3,
      nombre: "Proveedor 3",
      direccion: "Dirección 3",
      email: "email3@proveedor.com",
      telefono: "0987654321",
      empresa: "Empresa 3",
      cuenta: "2212",
    },
    {
      id: 4,
      nombre: "Proveedor 4",
      direccion: "Dirección 4",
      email: "email4@proveedor.com",
      telefono: "0987654321",
      empresa: "Empresa 4",
      cuenta: "3413",
    },
    {
      id: 5,
      nombre: "Proveedor 5",
      direccion: "Dirección 5",
      email: "email5@proveedor.com",
      telefono: "0987654321",
      empresa: "Empresa 5",
      cuenta: "9876",
    },
    {
      id: 6,
      nombre: "Proveedor 6",
      direccion: "Dirección 6",
      email: "email6@proveedor.com",
      telefono: "0987654321",
      empresa: "Empresa 6",
      cuenta: "6534",
    },
    {
      id: 7,
      nombre: "Proveedor 7",
      direccion: "Dirección 7",
      email: "email7@proveedor.com",
      telefono: "0987654321",
      empresa: "Empresa 7",
      cuenta: "3456",
    },
    {
      id: 8,
      nombre: "Proveedor 8",
      direccion: "Dirección 8",
      email: "email8@proveedor.com",
      telefono: "0987654321",
      empresa: "Empresa 8",
      cuenta: "5321",
    },
  ];

  const vendedores = [
    {
      id: 1,
      nombre: "Vendedor 1",
      direccion: "Dirección 1",
      email: "email1@vendedor.com",
      telefono: "1234567890",
    },
    {
      id: 2,
      nombre: "Vendedor 2",
      direccion: "Dirección 2",
      email: "email2@vendedor.com",
      telefono: "0987654321",
    },
  ];

  const burnedProvider = {
    nombres: "Martin",
    apellidos: "Corredor",
    email: "dev.martincorredor@gmail.com",
    teléfono: "3224682353",
    tipo: "Natural",
    documento: "1052405114",
    empresa: "Rappi",
    teléfonoEmpresa: "3212002638",
    emailEmpresa: "rappi@gmail.com",
    direccionEmpresa: "carrera 10 #20 Bogotá",
    nombreBanco: "Rappipay",
    numeroCuenta: "20304050",
  };

  const burnedSeller = {
    nombres: "Martin ",
    apellidos: "Corredor",
    email: "dev.martincorredor@gmail.com",
    teléfono: "3224682353",
    tipo: "cedula",
    documento: "1052405114",
    usuario: "martin",
    contraseña: "123456",
    direccion: "carrera 10 #20 Duitama",
  };

  const columnsProveedores = [
    "id",
    "nombre",
    "direccion",
    "email",
    "telefono",
    "empresa",
    "cuenta",
  ];

  const columnsVendedores = ["id", "nombre", "direccion", "email", "telefono"];

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
      <div className="header">
        <button
          onClick={() => handleRoleChange("proveedores")}
          className={role === "proveedores" ? "selected" : ""}
        >
          Proveedores
        </button>
        <button
          onClick={() => handleRoleChange("vendedores")}
          className={role === "vendedores" ? "selected" : ""}
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

      <div className="content">
        {role === "proveedores" && (
          <CustomTable
            data={proveedores}
            customColumns={columnsProveedores}
            role={role}
            onDelete={handleDelete}
          />
        )}
        {role === "vendedores" && (
          <CustomTable
            data={vendedores}
            customColumns={columnsVendedores}
            role={role}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default Personal;
