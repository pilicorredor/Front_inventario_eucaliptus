// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Components/LoginForm/LoginForm';
import HomePage from './Components/HomePage/HomePage';
import Personal from './Components/Personal/Personal';
import Navbar from './Components/SideNavbar/Navbar';

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
                
            </Routes>
        </Router>
    );
}

export default App;
