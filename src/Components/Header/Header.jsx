import React, { useState } from "react";
import { IoNotificationsSharp } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import "./Header.css";
import logo from "../Assets/logoInterfaces.png";
import NotificationModal from "./NotificationModal";
import { useNavigate } from "react-router-dom";

const Header = ({ pageTitle }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([
    {
      idNotification: 28,
      message: "Alerta: La cantidad de producto disponible con id PS-002 es mayor que la cantidad sugerida (40 unidades).",
      notificationDate: "2024-11-23T01:59:14.228+00:00",
      idStock: 92,
      idProduct: "PS-002",
    },
    {
      "idNotification": 23,
      "message": "La cantidad actual en inventario es ahora de 30 unidades.",
      "notificationDate": "2024-11-22T17:08:35.258+00:00",
      "idStock": 85,
      "idProduct": "PS-300"
    },
    {
      idNotification: 29,
      message: "Alerta: La cantidad de producto disponible con id PS-003 es menor que la cantidad sugerida (20 unidades).",
      notificationDate: "2024-11-23T02:15:00.228+00:00",
      idStock: 93,
      idProduct: "PS-003",
    },

  ]);

  const deleteNotification = (id) => {
    const updatedNotifications = notifications.filter(
      (notification) => notification.idNotification !== id
    );
    setNotifications(updatedNotifications);
  };

  const handleNotificationClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSettingsClick = () => {
    navigate("/config");
  }

  return (
    <div className="header">
      <div className="page-title">{pageTitle}</div>
      <ul className="header-options">
        <li>
          <IoMdSettings className="header-link" onClick={handleSettingsClick} style={{ cursor: 'pointer' }} />
        </li>
        <li>
          <IoNotificationsSharp className="header-link" onClick={handleNotificationClick} style={{ cursor: 'pointer' }} />
        </li>
        <li>
          <img src={logo} alt="logo" className="header-logo" />
        </li>
      </ul>
      {showModal && (
        <NotificationModal
          isOpen={showModal}
          onClose={handleCloseModal}
          notifications={notifications}
          deleteNotification={deleteNotification}
        />
      )}
    </div>
  );
};

export default Header;
