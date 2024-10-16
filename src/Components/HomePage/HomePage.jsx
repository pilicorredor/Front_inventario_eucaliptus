import React from 'react';
import './HomePage.css';
import Navbar from "../SideNavbar/Navbar.jsx";
import Header from "../Header/Header.jsx";

const HomePage = () => {
    return (
        <div className="homepage">
            <Header pageTitle="Inicio" />
            <Navbar />
            <div className='content'>
                <div className='card mision'>
                    <h2>Misión</h2>
                    <p>Naturista Eucaliptus se dedica a <br></br> promover la salud y el bienestar de <br></br> las familias a través de la venta de <br></br> productos naturistas de alta calidad. <br></br>Nos enfocamos en ofrecer una amplia variedad de alimentos, <br></br>suplementos y productos de cuidado personal que favorezcan un estilo de vida<br></br> saludable y en armonía con la naturaleza.</p>
                </div>

                <div className='card vision'>
                    <h2>Visión</h2>
                    
                </div>

                <div className='card values'>
                    <h2>Valores</h2>
                    <ul>
                        <li>Salud y bienestar</li>
                        <li>Calidad</li>
                        <li>Responsabilidad ambiental</li>
                        <li>Atención al cliente</li>
                        <li>Integridad</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default HomePage;