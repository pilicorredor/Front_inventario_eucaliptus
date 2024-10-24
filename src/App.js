import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LoginForm from './Components/LoginForm/LoginForm';
import HomePage from './Components/HomePage/HomePage';
import Personal from './Components/Personal/Personal';
import Navbar from './Components/SideNavbar/Navbar';
import RegisterSeller from './Components/RegisterSeller/RegisterSellerPage';
import RegisterProvider from './Components/RegisterProvider/RegisterProviderPage';
import Products from './Components/Products/Products';
import ModifyProvider from './Components/ModifyProvider/ModifyProviderPage';
import ModifySeller from './Components/ModifySeller/ModifySellerPage';
import Config from './Components/ConfigPanel/ConfigPanel';

const AppContent = () => {
    const [login, setLogin] = useState(false);
    const [username, setUsername] = useState(localStorage.getItem("username"));
    const [role, setRole] = useState(localStorage.getItem("role"));
    const location = useLocation();

    const handleLogin = ({ username, role }) => {
        localStorage.setItem('login', true);
        setUsername(username);
        setLogin(true);
        setRole(role);
    };

    const handleLogout = () => {
        localStorage.setItem('login', false);
        setLogin(false);
    };

    useEffect(() => {
        if (location.pathname === '/') {
            setLogin(false);
        } else {
            setLogin(true);
        }
    }, [location.pathname]);


    return (
        <>
            {login && <Navbar login={login} handleLogin={handleLogin} username={username} role={role} handleLogout={handleLogout} />}
            <Routes>
                <Route path='/' element={<LoginForm login={login} handleLogin={handleLogin} />} />
                <Route path='/inicio' element={<HomePage />} />
                <Route path='/config' element={<Config />} />
                <Route path='/personal*' element={<Personal />} />
                <Route path="/registrar-vendedor" element={<RegisterSeller />} />
                <Route path="/registrar-proveedor" element={<RegisterProvider />} />
                <Route path="/modificar/proveedor/:id" element={<ModifyProvider />} />
                <Route path="/modificar/vendedor/:id" element={<ModifySeller />} />
                <Route path='/productos*' element={<Products />} />
            </Routes>
        </>
    );
}

const App = () => {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;
