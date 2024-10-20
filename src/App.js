// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Components/LoginForm/LoginForm';
import HomePage from './Components/HomePage/HomePage';
import Personal from './Components/Personal/Personal';
import Navbar from './Components/SideNavbar/Navbar';
import RegistrarVendedor from './Components/RegisterSeller/RegisterSellerPage';
import RegistrarProveedor from './Components/RegisterProvider/RegisterProviderPage';
import EditPersonal from './Components/EditPersonal/EditPersonal';
import Products from './Components/Products/Products';

function App() {
    const [login, setLogin] = useState(localStorage.getItem('login'));
    const [username, setUsername] = useState(localStorage.getItem("username"));
    const [role, setRole] = useState(localStorage.getItem("role"));

    const handleLogin = ({ username, role }) => {
        localStorage.setItem('login', true)
        setUsername(username)
        setLogin(true)
        setRole(role)
    };

    const handleLogout = () => {
        localStorage.setItem('login', false)
        setLogin(false)
    }

    return (
        <Router>
            {login && <Navbar login={login} handleLogin={handleLogin} username={username} role={role} handleLogout={handleLogout} />}
            <Routes>
                <Route path='/' element={<LoginForm login={login} handleLogin={handleLogin} />} />
                {/* <Route path='/' element={<HomePage />} /> */}
                <Route path='/inicio' element={<HomePage />} />
                <Route path='/personal*' element={<Personal />} />
                <Route path="/registrar-vendedor" element={<RegistrarVendedor />} />
                <Route path="/registrar-proveedor" element={<RegistrarProveedor />} />
                <Route path="/modificar/:role/:id" element={<EditPersonal />} />
                <Route path='/productos*' element={<Products />} />
            </Routes>
        </Router>
    );
}

export default App;
