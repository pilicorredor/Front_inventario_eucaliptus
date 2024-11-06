import React from "react";
import "./PurchaseModal.css";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Box from "@mui/material/Box";

const PurchaseModal = ({ isOpen, onClose, onViewBill, onAddAnother }) => {
  if (!isOpen) return null;

  return (
    <Box className="modal-box">
      <h2>Producto añadido con éxito</h2>
      <CheckCircleOutlineIcon className="modal-icon icon-green" />
      <div className="modal-buttons-box">
        <button className="modal-button check-button" onClick={onViewBill}>
          Ver Factura Final
        </button>
        <button className="modal-button check-button" onClick={onAddAnother}>
          Añadir Otro Producto
        </button>
      </div>
    </Box>
  );
};

export default PurchaseModal;
