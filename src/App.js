import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { EmailProvider } from './Context/EmailContext';
import { VerifCodeProvider } from './Context/VerificationCodeContext';
import { ButtonContext, ButtonProvider } from './Context/ButtonContext';
import { ProductContext, ProductProvider } from './Context/ProductContext';
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
import ChooseProviderPurchase from './Components/RegisterPurchase/ChooseProviderPurchase';
import ChooseProductsPurchase from './Components/RegisterPurchase/ChooseProductsPurchase';
import FormRegisterDetailsProduct from './Components/RegisterPurchase/FormRegisterDetailsProduct';
import BillPurchase from './Components/RegisterPurchase/BillPurchase';
import AddProductSale from './Components/RegisterSale/AddProductSale';
import RegisterSale from './Components/RegisterSale/RegisterSale';
import BillSale from './Components/RegisterSale/BillSale';
import ReportPage from './Components/ReportPage/ReportPage';


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
                <Route path="/compra/proveedor" element={<ChooseProviderPurchase />} />
                <Route path="/compra/productos/:id" element={<ChooseProductsPurchase />} />
                <Route path="/compra/info-prod/:id" element={<FormRegisterDetailsProduct />} />
                <Route path="/compra/factura" element={<BillPurchase />} />
                <Route path="/nueva-venta" element={<AddProductSale />} />
                <Route path="/registrar-venta" element={<RegisterSale />} />
                <Route path="/factura-venta" element={<BillSale />} />
                <Route path="/reporte" element={<ReportPage />} />
            </Routes>
        </>
    );
}

const App = () => {
    return (
        <Router>
            <EmailProvider>
                <VerifCodeProvider>
                    <ButtonProvider>
                        <ProductProvider>
                            <AppContent />
                        </ProductProvider>
                    </ButtonProvider>
                </VerifCodeProvider>
            </EmailProvider>
        </Router>
    );
}

export default App;
