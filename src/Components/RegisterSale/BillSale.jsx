import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CustomTableBill from "../CustomTableBill/CustomTableBill";
import Header from "../Header/Header.jsx";
import { SERVICES } from "../../Constants/Constants";
import CircularProgress from "@mui/material/CircularProgress";
import SuccessModal from "../../Modales/SuccessModal.jsx";
import FailModal from "../../Modales/FailModal.jsx";
import "./BillSale.css";

const BillSale = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccesful, setIsSuccesful] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const saleID = location.state?.dataSale?.idSale || {};

  const handleClearProducts = () => {
    navigate("/nueva-venta");
  };

  const handlePrint = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const url = `${SERVICES.SEND_BILL_SALE_SERVICE}/${saleID}`;
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
      setMessage("Error en la solicitud de envio de factura de venta:", error);
    }
  };

  return (
    <div className="sale">
      <Header pageTitle="Comprobante de Venta" />
      {loading && (
        <div className="loading-container">
          <CircularProgress className="loading-icon" />
        </div>
      )}
      <div className="table-bill">
        <CustomTableBill isSale={true} />
      </div>
      <div className="billSale-buttons-box">
        <button
          className="billSale-button check-button"
          onClick={handleClearProducts}
        >
          Aceptar
        </button>
        <button className="billSale-button check-button" onClick={handlePrint}>
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

export default BillSale;
