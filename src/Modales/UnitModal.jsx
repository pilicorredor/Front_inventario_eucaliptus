import React, { useState, useEffect } from "react";
import "./UnitModal.css";

const UnitModal = ({ isOpen, onClose, onSave, mode, unitName }) => {
  const [unitData, setUnitData] = useState({
    unitName: "",
    description: "",
  });

  useEffect(() => {
    if (unitName) {
      setUnitData({ unitName: unitName, description: "" });
    }
  }, [unitName]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUnitData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(unitData);
    setUnitData({ unitName: "", description: "" });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>
          {mode === "addUnit" ? "Agregar Nueva Unidad" : "Agregar Descripción"}
        </h3>
        {mode === "addUnit" && (
          <div className="modal-field">
            <label>Nombre de la Unidad:</label>
            <input
              type="text"
              name="unitName"
              value={unitData.unitName}
              onChange={handleInputChange}
              required
            />
          </div>
        )}

        {mode === "addDescription" && (
          <div className="modal-field">
            <label>Nombre de la Unidad:</label>
            <input
              type="text"
              name="unitName"
              value={unitData.unitName}
              disabled
              onChange={handleInputChange}
              required
            />
          </div>
        )}

        <div className="modal-field">
          <label>Descripción de la Unidad:</label>
          <input
            type="text"
            name="description"
            value={unitData.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="modal-buttons-box">
          <button className="modal-button check-button" onClick={handleSave}>
            Guardar
          </button>
          <button className="modal-button cancel-button" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnitModal;
