import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "./CustomModal.css";
import { MODAL_TYPES, BUTTONS_ACTIONS } from "../Constants/Constants";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const CustomModal = ({ entity, action, openModal, onClose, successfull }) => {
  const [modalType, setModalType] = useState("");
  const [serviceCheck, setServiceCheck] = useState("");
  const [title, setTitle] = useState("");

  const modalContent = () => {
    if (action === BUTTONS_ACTIONS.REGISTRAR) {
      if (successfull === false) {
        setTitle(`No se pudo registrar el ${capitalize(entity)}`);
        setModalType(MODAL_TYPES.ERROR);
      } else {
        setTitle(`${capitalize(entity)} registrado con éxito.`);
        setModalType(MODAL_TYPES.CHECK);
      }
    }
    if (action === BUTTONS_ACTIONS.MODIFICAR) {
      if (successfull === false) {
        setTitle(`No se pudo modificar el ${capitalize(entity)}`);
        setModalType(MODAL_TYPES.ERROR);
      } else {
        setTitle(`${capitalize(entity)} modificado con éxito.`);
        setModalType(MODAL_TYPES.CHECK);
      }
    }
    if (action === BUTTONS_ACTIONS.ELIMINAR) {
      setTitle(`¿Seguro quieres eliminar este ${entity}?`);
      setModalType(MODAL_TYPES.CONFIRMATION);
    }
  };

  useEffect(() => {
    if (openModal) {
      modalContent();
      setServiceCheck("");
    }
  }, [openModal, action, entity]);

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleService = () => {
    // ACÁ HAS EL FETCH
    //En el response.ok
    // setServiceCheck(MODAL_TYPES.CHECK)
    // Cuando el servicio no responda
    // setServiceCheck(MODAL_TYPES.ERROR)
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
