import React from "react";
import * as Io5Icons from "react-icons/io5";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="sidebar">
        <img
          src="https://via.placeholder.com/80"
          alt="Profile"
          className="profile-image"
        />
      <div className="user-profile">
        <h4 className="username">Laura Carreño</h4>
        <p className="user-role">Admin</p>
        
      </div>
      <hr className="divider" />
      <ul className="nav-menu-items">
        {SidebarData.map((item, index) => {
          return (
            <li key={index} >
              <Link to={item.path} className='item'>
                {item.icon}
                <span className="menu-text">{item.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="nav-item-bottom">
        <Link to="/salir">
          <Io5Icons.IoExit className='nav-menu-item-icon'/>
          <span className="menu-text">Salir</span>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
