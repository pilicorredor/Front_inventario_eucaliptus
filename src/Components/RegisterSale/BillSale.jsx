import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CustomTableBill from "../CustomTableBill/CustomTableBill";
import Header from "../Header/Header.jsx";
import "./BillSale.css";

const BillSale = () => {
  const navigate = useNavigate();

  const handleClearProducts = () => {
    navigate("/nueva-venta");
  };

  const handlePrint = () => {
    //Agregarle algo para simular la impresión o algo así
  };

  return (
    <div className="sale">
      <Header pageTitle="Factura de Venta" />
      <div className="table-bill">
        <CustomTableBill isSale={true} />
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

export default BillSale;
