import React from 'react';
import './NotificationModal.css';
import logo from "../Assets/logo.jpg";
import { IoMdCloseCircle } from "react-icons/io";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const NotificationModal = ({ isOpen, onClose, notifications, deleteNotification }) => {
  if (!isOpen) return null;

  function isAlertMessage(notification) {
    const { message } = notification;
    return message.toLowerCase().includes('alerta');
  }

  
const alertNotifications = notifications.filter(notification => isAlertMessage(notification));

  return (
    <div className="notif-overlay">
      <div className="notif-content">
        <div className="notif-header">
          <img src={logo} alt="logo" className="header-logo" />
          <div className="header-text">
            <h2>Sistema de Gestión de Inventario</h2>
            <h3>Naturista Eucaliptus</h3>
          </div>
          <button className="close-btn" onClick={onClose}>
          <IoMdCloseCircle />
          </button>
        </div>
        <div className='notif-body-wrapper'>
          <div className="notif-body">
            <div className='notif-body body-title'>Notificaciones</div>
            <div className='body-messages'>
              {notifications.map((notification) => (
              <div key={notification.idNotification} 
              className={`notification-item alert ${isAlertMessage(notification) ? 
              'alerta' : ''}`}>
                <p>{notification.message}</p>

                <IconButton
                  aria-label="delete"
                  className="delete-button"
                  onClick={() => deleteNotification(notification.idNotification)}
                >
                  <DeleteIcon />
                </IconButton>
                
              </div>
            ))}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
