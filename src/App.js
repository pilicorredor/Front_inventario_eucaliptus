import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { EmailProvider } from './Context/EmailContext';
import { VerifCodeProvider } from './Context/VerificationCodeContext';
import LoginForm from './Components/LoginForm/LoginForm';
import HomePage from './Components/HomePage/HomePage';
import Personal from './Components/Personal/Personal';
import Navbar from './Components/SideNavbar/Navbar';
import RegisterSeller from './Components/RegisterSeller/RegisterSellerPage';
import RegisterProvider from './Components/RegisterProvider/RegisterProviderPage';
import Products from './Components/Products/Products';
import ChooseProvider from './Components/RegisterProducts/ChooseProvider';
import RegisterProduct from './Components/RegisterProducts/FormRegisterProduct';
import ModifyProvider from './Components/ModifyProvider/ModifyProviderPage';
import ModifySeller from './Components/ModifySeller/ModifySellerPage';
import ModidyProducts from './Components/ModifyProducts/ModifyProducts';
import Config from './Components/ConfigPanel/ConfigPanel';
import SendEmailPassword from './Components/ChangePassword/SendEmailPassword';
import CheckPswdToken from './Components/ChangePassword/CheckPswdToken';
import RecoveryUpdatePassword from './Components/ChangePassword/RecoveryUpdatePassword';
import LoginFormChangePswd from './Components/ChangePassword/LoginFormChangePswd';
import UpdatePassword from './Components/ChangePassword/UpdatePassword';


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
                <Route path='/inicio' element={<HomePage username={username} />} />
                <Route path='/config' element={<Config userRol={role} username={username} handleLogout={handleLogout} />} />
                <Route path='/config/login-to-change-password' element={<LoginFormChangePswd login={login} handleLogin={handleLogin} />} />
                <Route path='/config/send-email-password' element={<SendEmailPassword />} />
                <Route path='/config/check-token-password' element={<CheckPswdToken />} />
                <Route path='/config/recovery-update-password' element={<RecoveryUpdatePassword />} />
                <Route path='/config/update-password' element={<UpdatePassword username={username} />} />
                <Route path='/personal*' element={<Personal />} />
                <Route path="/registrar-vendedor" element={<RegisterSeller />} />
                <Route path="/registrar-proveedor" element={<RegisterProvider />} />
                <Route path="/modificar/proveedor/:id" element={<ModifyProvider />} />
                <Route path="/modificar/vendedor/:id" element={<ModifySeller />} />
                <Route path='/productos*' element={<Products />} />
                <Route path='/productos/escoger-proveedor' element={<ChooseProvider />} />
                <Route path="/productos/registrar/:id" element={<RegisterProduct />} />
                <Route path="/modificar/producto/:id" element={<ModidyProducts />} />
            </Routes>
        </>
    );
}

const App = () => {
    return (
        <Router>
            <EmailProvider>
                <VerifCodeProvider>
                    <AppContent />
                </VerifCodeProvider>
            </EmailProvider>
        </Router>
    );
}

export default App;
