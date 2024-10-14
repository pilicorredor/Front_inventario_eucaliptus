import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "./CustomModal.css";
import { MODAL_TYPES, BUTTONS_ACTIONS } from "../Constants/Constants";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const CustomModal = ({ entity, action, openModal, onClose }) => {
  const [modalType, setModalType] = useState("");
  const [serviceCheck, setServiceCheck] = useState("");
  const [title, setTitle] = useState("");

  const defineModalContent = () => {
    if (action === BUTTONS_ACTIONS.ELIMINAR) {
      setTitle(`¿Seguro quieres eliminar este ${entity}?`);
      setModalType(MODAL_TYPES.CONFIRMATION);
    } else if (action === BUTTONS_ACTIONS.REGISTRAR) {
      setTitle(`${capitalize(entity)} registrado con éxito.`);
      setModalType(MODAL_TYPES.CHECK);
    } else if (action === BUTTONS_ACTIONS.MODIFICAR) {
      setTitle(`${capitalize(entity)} modificado con éxito.`);
      setModalType(MODAL_TYPES.CHECK);
    }
  };

  useEffect(() => {
    if (openModal) {
      defineModalContent();
      setServiceCheck("");
    }
  }, [openModal, action, entity]);

  // Función para capitalizar el nombre de la entidad
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleService = () => {
    if (action === BUTTONS_ACTIONS.ELIMINAR) {
      const result =
        //Acá toca cambiarlo según la respuesta del servicio el lugar de un número random
        Math.random() > 0.5 ? MODAL_TYPES.CHECK : MODAL_TYPES.ERROR;
      setServiceCheck(result);
    }
  };

  useEffect(() => {
    if (serviceCheck === MODAL_TYPES.CHECK) {
      setTitle(`${capitalize(entity)} eliminado con éxito.`);
      setModalType(MODAL_TYPES.CHECK);
    } else if (serviceCheck === MODAL_TYPES.ERROR) {
      setTitle(`No se pudo eliminar el ${entity}.`);
      setModalType(MODAL_TYPES.ERROR);
    }
  }, [serviceCheck, entity]);

  return (
    <Modal open={openModal} onClose={onClose}>
      <Box className="modal-box">
        <h2 id="parent-modal-title">{title}</h2>
        {modalType === MODAL_TYPES.CHECK && (
          <CheckCircleOutlineIcon className="modal-icon icon-green" />
        )}
        {modalType === MODAL_TYPES.ERROR && (
          <HighlightOffIcon className="modal-icon icon-red" />
        )}
        {modalType === MODAL_TYPES.CONFIRMATION && (
          <ErrorOutlineIcon className="modal-icon" />
        )}

        {modalType === MODAL_TYPES.CONFIRMATION ? (
          <div className="modal-buttons-box">
            <button className="modal-button cancel-button" onClick={onClose}>
              Cancelar
            </button>
            <button
              className="modal-button check-button"
              onClick={handleService}
            >
              Aceptar
            </button>
          </div>
        ) : (
          <button className="modal-button check-button" onClick={onClose}>
            Aceptar
          </button>
        )}
      </Box>
    </Modal>
  );
};

export default CustomModal;
