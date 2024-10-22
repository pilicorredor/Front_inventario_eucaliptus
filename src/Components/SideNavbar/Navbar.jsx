import { useEffect, useState } from "react";
import * as Io5Icons from "react-icons/io5";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Navbar.css";
import userImg from "../Assets/person-circle.png";

const Navbar = ({ username, role, handleLogout }) => {
  return (
    <div className="sidebar">
      <img
        src={userImg}
        alt="Profile"
        className="profile-image"
      />
      <div className="user-profile">
        <h4 className="username">{username || "Usuario"}</h4>
        <div className="user-role">{role || "Rol no asignado"}</div>
      </div>
      <hr className="divider" />
      <ul className="nav-menu-items">
        {SidebarData.map((item, index) => {
          return (
            <li key={index}>
              <Link to={item.path} className="item">
                {item.icon}
                <span className="menu-text">{item.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="nav-item-bottom">
        <Link to="/" onClick={handleLogout}>
          <Io5Icons.IoExit className="nav-menu-item-icon" />
          <span className="menu-text">Salir</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
