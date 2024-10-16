import React from "react";
import { IoNotificationsSharp } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";

const Header = ({ pageTitle }) => {
    return (
        <div className="header">
            <div className="page-title">
                {pageTitle}
            </div>
            <ul className="header-options">
                <li><IoMdSettings /></li>
                <li><IoNotificationsSharp /></li>
                <li><img
                    src="https://via.placeholder.com/80"
                    alt="logo"
                    className="logo" />
                </li>
            </ul>

        </div>
    )
}

export default Header