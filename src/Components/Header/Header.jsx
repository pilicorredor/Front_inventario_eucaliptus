import React from "react";
import { IoNotificationsSharp } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import "./Header.css";
import logo from "../Assets/logoInterfaces.png";

const Header = ({ pageTitle }) => {
  return (
    <div className="header">
      <div className="page-title">{pageTitle}</div>
      <ul className="header-options">
        <li>
          <IoMdSettings className="header-link"/>
        </li>
        <li>
          <IoNotificationsSharp className="header-link"/>
        </li>
        <li>
          <img src={logo} alt="logo" className="header-logo" />
        </li>
      </ul>
    </div>
  );
};

export default Header;
