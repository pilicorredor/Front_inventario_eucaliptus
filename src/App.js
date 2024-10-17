// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Components/LoginForm/LoginForm';
import HomePage from './Components/HomePage/HomePage';
import Personal from './Components/Personal/Personal';
import Navbar from './Components/SideNavbar/Navbar';
import RegistrarVendedor from './Components/RegisterSeller/RegisterSellerPage';
import RegistrarProveedor from './Components/RegisterSupplier/RegisterSupplierPage';
import EditPersonal from './Components/EditPersonal/EditPersonal';

function App() {
    const [login, setLogin] = useState(false);

    const handleLogin = () => {
        setLogin(true);
    };

    return (
        <Router>
            {login && <Navbar login={login} handleLogin={handleLogin} />}
            <Routes>
                <Route path='/' element={<LoginForm login={login} handleLogin={handleLogin} />} />
                <Route path='/inicio' element={<HomePage />} />
                <Route path='/personal*' element={<Personal />} />
                <Route path="/registrar-vendedor" element={<RegistrarVendedor />} />
                <Route path="/registrar-proveedor" element={<RegistrarProveedor />} />
                <Route path="/modificar/:role/:id" element={<EditPersonal />} />
            </Routes>
        </Router>
    );
}

export default App;
