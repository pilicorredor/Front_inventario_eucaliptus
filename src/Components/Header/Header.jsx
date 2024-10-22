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
          <IoMdSettings className="header-link" onClick={handleSettingsClick} style={{cursor: 'pointer'}} />
        </li>
        <li>
          <IoNotificationsSharp className="header-link" onClick={handleNotificationClick} style={{ cursor: 'pointer' }} />
        </li>
        <li>
          <img src={logo} alt="logo" className="header-logo" />
        </li>
      </ul>
      {showModal && <NotificationModal onClose={handleCloseModal} />}
    </div>
  );
};

export default Header;
