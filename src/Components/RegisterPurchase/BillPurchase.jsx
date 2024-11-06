import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CustomTableBill from "../CustomTableBill/CustomTableBill";
import { ProductContext } from "../../Context/ProductContext";

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
    <div>
      <h1>Detalles de Productos</h1>
      <CustomTableBill />
      <div className="action-buttons">
        <button onClick={handleClearProducts}>Aceptar</button>
        <button onClick={handlePrint}>Imprimir</button>
      </div>
    </div>
  );
};

export default BillPurchase;
