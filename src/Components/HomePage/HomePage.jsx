import React, { useState, useEffect } from "react";
import "./HomePage.css";
import Header from "../Header/Header.jsx";
import coutionLogo from "../../Assets/danger.png";
import DataTable from "./DataTable.jsx";
import { SERVICES } from "../../Constants/Constants.js";
import CircularProgress from "@mui/material/CircularProgress";
import FailModal from "../../Modales/FailModal.jsx";

/**
 * Componente principal de la página de inicio de la aplicación.
 *
 * Este componente muestra un resumen de las estadísticas de ventas y compras,
 * además de una tabla con los productos próximos a vencer.
 *
 * @component
 * @param {Object} props - Props del componente.
 * @param {string} props.username - El nombre del usuario que se muestra en el mensaje de bienvenida.
 *
 * @example
 * <HomePage username="Evelio" />
 */
const HomePage = ({ username }) => {
  const [productsData, setProductsData] = useState([]);
  const [totalSalesIncome, setTotalSalesIncome] = useState("");
  const [totalPurchaseInvestment, setTotalPurchaseInvestment] = useState("");
  const [totalSalesCount, setTotalSalesCount] = useState("");
  const [totalPurchasesCount, setTotalPurchasesCount] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageFail, setMessageFail] = useState("");

  useEffect(() => {
    fetchExpiringProductsData();
    fetchSummaryData();
  }, []);

  /**
   * Obtiene la lista de productos que están próximos a vencer desde el servidor.
   *
   * Realiza una solicitud a la API y actualiza el estado `productsData` con los datos obtenidos.
   * Muestra un mensaje de error en caso de falla.
   *
   * @async
   * @function
   */
  const fetchExpiringProductsData = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(SERVICES.GET_EXPIRING_PRODUCTS, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setLoading(false);
        const data = await response.json();
        const formattedProducts = data.map((product) => ({
          idProduct: product.idProduct,
          productName: product.productName,
          quantity: product.quantity,
          dueDate: product.dueDate,
        }));
        setProductsData(formattedProducts);
      } else {
        setLoading(false);
        setMessageFail("No fue posible recuperar los datos");
        setIsModalOpen(true);
      }
    } catch (error) {
      setLoading(false);
      setMessageFail(
        "Error interno del servidor durante la recuperacion de datos"
      );
      setIsModalOpen(true);
    }
  };

   /**
   * Obtiene el resumen de las estadísticas de ventas y compras desde el servidor.
   *
   * Actualiza los estados relacionados con las métricas de ingresos, inversiones y conteos.
   * Muestra un mensaje de error en caso de falla.
   *
   * @async
   * @function
   */
  const fetchSummaryData = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(SERVICES.GET_HOMEPAGE_SUMMARY, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setLoading(false);
        const data = await response.json();
        setTotalSalesIncome(data.totalSalesIncome);
        setTotalPurchaseInvestment(data.totalPurchaseInvestment);
        setTotalSalesCount(data.totalSalesCount);
        setTotalPurchasesCount(data.totalPurchasesCount);
      } else {
        setLoading(false);
        setMessageFail("No fue posible recuperar los datos");
        setIsModalOpen(true);
      }
    } catch (error) {
      setLoading(false);
      setMessageFail(
        "Error interno del servidor durante la recuperacion de datos"
      );
      setIsModalOpen(true);
    }
  };

  return (
    <div className="homepage-admin">
      <Header pageTitle="Inicio" />
      <div className="homepage-admin-content">
        {loading && (
          <div className="loading-container">
            <CircularProgress className="loading-icon" />
          </div>
        )}
        <div className="homepage-admin-welcoming-message">
          <h2>
            Hola {username}, estos son algunos datos de la operación durante
            este mes:{" "}
          </h2>
        </div>

        <div className="home-card-data">
          <div className="home-data">
            <p>Ingreso ventas</p>
            <h2>${totalSalesIncome?.toLocaleString("es-ES")}</h2>
          </div>
          <div className="home-data">
            <p>Inversión compra productos</p>
            <h2>${totalPurchaseInvestment?.toLocaleString("es-ES")}</h2>
          </div>
          <div className="home-data">
            <p>Total ventas realizadas</p>
            <h2> {totalSalesCount} </h2>
          </div>
          <div className="home-data">
            <p>Total compras realizadas</p>
            <h2> {totalPurchasesCount} </h2>
          </div>
        </div>

        <div className="expire-products-label">
          <img src={coutionLogo} alt="Caution Icon" />
          <p>Productos a vencer próximamente:</p>
        </div>

        <div className="home-expire-data-table">
          <DataTable data={productsData} />
        </div>
      </div>
      <FailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={messageFail}
      />
    </div>
  );
};

export default HomePage;
