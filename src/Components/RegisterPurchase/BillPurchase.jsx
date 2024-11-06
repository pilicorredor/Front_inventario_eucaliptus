import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CustomTableBill from "../CustomTableBill/CustomTableBill";
import { ProductContext } from "../../Context/ProductContext";
import Header from "../Header/Header.jsx";
import "./BillPurchase.css";

const BillPurchase = () => {
  const { clearProducts } = useContext(ProductContext);
  const navigate = useNavigate();

  const handleClearProducts = () => {
    clearProducts();
    navigate("/compra/proveedor");
  };

  const handlePrint = () => {
    //Agregarle algo para simular la impresión o algo así
    clearProducts();
  };

  return (
    <div className="purchas">
      <Header pageTitle="Factura de Compra" />
      <div className="table-bill">
        <CustomTableBill />
      </div>
      <div className="modal-buttons-box">
        <button
          className="modal-button check-button"
          onClick={handleClearProducts}
        >
          Aceptar
        </button>
        <button className="modal-button check-button" onClick={handlePrint}>
          Imprimir
        </button>
      </div>
    </div>
  );
};

export default BillPurchase;
