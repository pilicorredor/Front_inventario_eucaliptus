import React from 'react';
import './HomePage.css';
import Navbar from "../SideNavbar/Navbar.jsx";
import Header from "../Header/Header.jsx";
import missionImg from "../Assets/misionImg.png";
import visionImg from "../Assets/visionImg.png";
import valuesImg from "../Assets/valuesImg.png";

const HomePage = () => {
    return (
        <div className="homepage">
            <Header pageTitle="Inicio" />
            <Navbar />
            <div className='content'>
                <div className='card mision'>
                    <div>
                        <h2>Misión</h2>
                        <p>Naturista Eucaliptus se dedica a promover la salud y el bienestar
                            de las familias a través de la venta de productos naturistas de
                            alta calidad. Nos enfocamos en ofrecer una amplia variedad de alimentos,
                            suplementos y productos de cuidado personal que favorezcan un estilo de vida
                            saludable y en armonía con la naturaleza.</p>
                    </div>

                    <img src={missionImg} alt="Mission Icon" />

                </div>

                <div className='card vision'>
                    <div>
                        <h2>Visión</h2>
                        <p>Convertirnos en un referente lider en el mercado de
                            productos naturistas en Colombia, expandiendo nuestra presencia
                            a otras ciudades y regiones del país, y consolidandonos como la
                            primera opcion para quienes buscan alternativas naturales para
                            el cuidado de su salud y bienestar.</p>
                    </div>

                    <img src={visionImg} alt="Vision Icon" />
                </div>

                <div className='card values'>
                    <div>
                        <h2>Valores</h2>
                        <div className='values-list'>
                            <ul>
                                <li>Salud y bienestar</li>
                                <li>Calidad</li>
                                <li>Responsabilidad ambiental</li>
                                <li>Atención al cliente</li>
                                <li>Integridad</li>
                            </ul>
                        </div>
                    </div>
                    <img src={valuesImg} alt="Values Icon" />
                </div>
            </div>
        </div>
    );
}

export default HomePage;