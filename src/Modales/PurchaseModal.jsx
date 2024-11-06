import React from "react";
import "./PurchaseModal.css";
import CustomTableBill from "../Components/CustomTableBill/CustomTableBill";

const PurchaseModal = ({ isOpen, onClose, onViewBill, onAddAnother, data }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Producto añadido con éxito</h2>
        <div className="modal-buttons">
          <button onClick={onViewBill}>Ver Factura Final</button>
          <button onClick={onAddAnother}>Añadir Otro Producto</button>
        </div>
        <button className="modal-close" onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
};

export default PurchaseModal;
