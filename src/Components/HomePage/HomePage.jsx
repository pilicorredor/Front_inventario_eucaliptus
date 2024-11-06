import React from "react";
import "./HomePage.css";
import Header from "../Header/Header.jsx";
import coutionLogo from "../Assets/danger.png";
import DataTable from "./DataTable.jsx";

const HomePage = ({ username }) => {

  const sampleData = [
    {
      idProducto: 'PS-001',
      nombre: 'Aceite de coco',
      cantidadVencer: 10,
      fechaVencimiento: '02/11/2024',
      operacion: 'Editar'
    },
    {
      idProducto: 'PS-002',
      nombre: 'Semillas de chía',
      cantidadVencer: 5,
      fechaVencimiento: '07/12/2024',
      operacion: 'Eliminar'
    },
    {
      idProducto: 'PS-003',
      nombre: 'Pastillas de vitamina',
      cantidadVencer: 7,
      fechaVencimiento: '07/11/2024',
      operacion: 'Eliminar'
    },
  ];



  return (
    <div className="homepage">
      <Header pageTitle="Inicio" />
      <div className="homepage-content">

        <div className="homepage-welcoming-message">
          <h2>Hola {username}, estos son algunos datos de la operación durante este mes: </h2>
        </div>

        <div className="home-card data">
          <div className="home-data income">
            <p>Ingreso ventas</p>
            <h2>$412.000</h2>
          </div>
          <div className="home-data expenses">
            <p>Inversión compra productos</p>
            <h2>$50.000</h2>
          </div>
          <div className="home-data sales">
            <p>Total ventas realizadas</p>
            <h2>50</h2>
          </div>
          <div className="home-data purchases">
            <p>Total compras realizadas</p>
            <h2>2</h2>
          </div>
        </div>

        <div className="expire-products-label">
          <img src={coutionLogo} alt="Caution Icon" />
          <p>Productos a vencer próximamente:</p>
        </div>

        <div className="home-expire-data-content">
        <DataTable data={sampleData} />
        </div>

      </div>
    </div>
  );
};

export default HomePage;
