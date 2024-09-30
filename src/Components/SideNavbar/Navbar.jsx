import React from 'react'
import * as Io5Icons from "react-icons/io5";
import { Link } from "react-router-dom";
import { SidebarData } from './SidebarData';
import './Navbar.css';

function Navbar() {
    return (
        <div className='sidebar'>
            <div className='user-image'>
                <img
                    src="https://via.placeholder.com/80"
                    alt="Profile"
                    className="profile-image"
                />
            </div>
            <div className="navbar-toggle">
                <div className="user-profile">
                    <h4 className="username">Laura Carreño</h4>
                    <p className="user-role">Admin</p>
                    <hr className="divider" />
                </div>
                <div className='closeContainer'>
                    <div className='closeTrigger'></div>
                    <div className='closeMenu'></div>
                </div>
            </div>
            <ul className='nav-menu-items'>

                {SidebarData.map((item, index) => {
                    return (
                        <li key={index} className={item.cName}>
                            <Link to={item.path}>
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        </li>
                    )
                })}

                <div className="nav-item-bottom">
                    <Link to="/salir">
                        <Io5Icons.IoExit />
                        <span>Salir</span>
                    </Link>
                </div>
            </ul>
        </div>
    )
}

export default Navbar;
