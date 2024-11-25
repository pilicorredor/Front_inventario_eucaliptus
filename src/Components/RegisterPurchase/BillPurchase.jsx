import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CustomTableBill from "../CustomTableBill/CustomTableBill";
import { ProductContext } from "../../Context/ProductContext";
import Header from "../Header/Header.jsx";
import { SERVICES } from "../../Constants/Constants";
import CircularProgress from "@mui/material/CircularProgress";
import SuccessModal from "../../Modales/SuccessModal.jsx";
import FailModal from "../../Modales/FailModal.jsx";
import "./BillPurchase.css";

const BillPurchase = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccesful, setIsSuccesful] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const { clearProducts } = useContext(ProductContext);
  const purchaseID = location.state?.purchaseID || [];
  const navigate = useNavigate();

  const handleClearProducts = () => {
    clearProducts();
    navigate("/compra/proveedor");
  };

  const handlePrint = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const url = `${SERVICES.SEND_BILL_PURCHASE_SERVICE}/${purchaseID}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setLoading(false);
        setIsSuccesful(true);
        setIsModalOpen(true);
        setMessage("Factura enviada con exito");
      } else {
        setIsSuccesful(false);
        setIsModalOpen(true);
        setMessage("No fue posible enviar la Factura");
      }
    } catch (error) {
      setIsSuccesful(false);
      setIsModalOpen(true);
      setMessage("Error en la solicitud de envio de factura de compra:", error);
    }
    clearProducts();
  };

  return (
    <div className="purchas">
      <Header pageTitle="Comprobante de Compra" />
      {loading && (
        <div className="loading-container">
          <CircularProgress className="loading-icon" />
        </div>
      )}
      <div className="table-bill">
        <CustomTableBill isSale={false} />
      </div>
      <div className="billpurchase-buttons-box">
        <button
          className="billpurchase-button check-button"
          onClick={handleClearProducts}
        >
          Aceptar
        </button>
        <button
          className="billpurchase-button check-button"
          onClick={handlePrint}
        >
          Enviar Factura
        </button>
      </div>
      {isSuccesful ? (
        <SuccessModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          message={message}
        />
      ) : (
        <FailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          message={message}
        />
      )}
    </div>
  );
};

export default BillPurchase;
