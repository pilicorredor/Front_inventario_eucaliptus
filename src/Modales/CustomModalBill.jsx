import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import "./CustomModalBill.css";

const CustomModalBill = ({ isOpen, billId, onClose }) => {
  const [loading, setLoading] = useState(false);
  if (!isOpen) return null;

  

  return (
    <Box className="modal-box">
      {loading && (
        <div className="modal-loading-container">
          <CircularProgress className="modal-loading-icon" />
        </div>
      )}
      <h2>{billId}</h2>
      <div>
        <button className="modal-button check-button" onClick={onClose}>
          Aceptar
        </button>
      </div>
    </Box>
  );
};

export default CustomModalBill;
