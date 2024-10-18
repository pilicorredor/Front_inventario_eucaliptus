import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomTable from "../CustomTable/CustomTable";
import SearchIcon from "@mui/icons-material/Search";
import "./Products.css";
import Header from "../Header/Header.jsx";

const Products = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("todos");

  const handleRoleChange = (selectedCategory) => {
    setCategory(selectedCategory);
    navigate(`/products/${selectedCategory}`);
  };

  const handleSearch = () => {
    console.log("Buscar:", searchQuery);
  };

  const handleNew = () => {
    navigate(`/registrarProducto-${category}`);
  };

  return (
    <div className="products">
      <Header pageTitle="Productos" />
      <div>
        <div className="products-header">
          <button
            onClick={() => handleRoleChange("todos")}
            className={category === "todos" ? "selected" : ""}
          >
            Todos
          </button>
          <button
            onClick={() => handleRoleChange("perecederos")}
            className={category === "perecederos" ? "selected" : ""}
          >
            Perecederos
          </button>
          <button
            onClick={() => handleRoleChange("noPerecederos")}
            className={category === "noPerecederos" ? "selected" : ""}
          >
            No Perecederos
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
      </div>
    </div>
  );
};

export default Products;
