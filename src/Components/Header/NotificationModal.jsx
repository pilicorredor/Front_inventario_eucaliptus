import React, { useState } from "react";
import "./NotificationModal.css";
import { IoTrash } from "react-icons/io5";
import { IoSearchSharp } from "react-icons/io5";

const NotificationModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("vencimiento");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="notif-overlay">
      <div className="notif-content">
        <h2 className="notif-title">Notificaciones</h2>
        <div className="notif-tab-menu">
          <button
            className={activeTab === "desabastecimiento" ? "active" : ""}
            onClick={() => handleTabChange("desabastecimiento")}
          >
            Desabastecimiento
          </button>
          <button
            className={activeTab === "vencimiento" ? "active" : ""}
            onClick={() => handleTabChange("vencimiento")}
          >
            Vencimiento
          </button>
        </div>
        <div className="notif-search-bar">
          <IoSearchSharp className="notif-search-icon" />
          <input type="text" placeholder="Ingresa producto o fecha" />
          <button className="notif-search-btn">Buscar</button>
        </div>

        {activeTab === "vencimiento" ? (
          <table className="notif-table">
            <thead>
              <tr>
                <th>Fecha Notificación</th>
                <th>Producto</th>
                <th>Fecha de vencimiento</th>
                <th>Operación</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>20/10/2024</td>
                <td>Aceite</td>
                <td>30/10/2024</td>
                <td>
                  <button className="notif-delete-btn">
                    {" "}
                    <IoTrash />{" "}
                  </button>
                </td>
              </tr>
              <tr>
                <td>15/10/2024</td>
                <td>Semillas</td>
                <td>15/11/2024</td>
                <td>
                  <button className="notif-delete-btn">
                    {" "}
                    <IoTrash />{" "}
                  </button>
                </td>
              </tr>
              <tr className="alert-row">
                <td>14/10/2024</td>
                <td>Chocolate</td>
                <td>23/10/2024</td>
                <td>
                  <button className="notif-delete-btn">
                    {" "}
                    <IoTrash />{" "}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <table className="notif-table">
            <thead>
              <tr>
                <th>Fecha Notificación</th>
                <th>Producto</th>
                <th>Stock Restante</th>
                <th>Operación</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>20/10/2024</td>
                <td>Aceite</td>
                <td>5 unidades</td>
                <td>
                  <button className="notif-delete-btn">
                    {" "}
                    <IoTrash />{" "}
                  </button>
                </td>
              </tr>
              <tr>
                <td>15/10/2024</td>
                <td>Semillas</td>
                <td>2 unidades</td>
                <td>
                  <button className="notif-delete-btn">
                    {" "}
                    <IoTrash />{" "}
                  </button>
                </td>
              </tr>
              <tr className="alert-row">
                <td>14/10/2024</td>
                <td>Chocolate</td>
                <td>0 unidades</td>
                <td>
                  <button className="notif-delete-btn">
                    {" "}
                    <IoTrash />{" "}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        )}
        <button className="notif-close-btn" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default NotificationModal;
