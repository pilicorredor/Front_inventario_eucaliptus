import logo from './logo.svg';
import './App.css';
import LoginForm from './Components/LoginForm/LoginForm';
import HomePage from './Components/HomePage/HomePage';
import Personal from './Components/Personal/Personal';
import Navbar from './Components/SideNavbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [login, setLogin] = useState(false)

  const handleLogin = () => {
    console.log('click')
    setLogin(true)
  }

  return (
    <>
      <Router>
        {login && <Navbar login={login} handleLogin={handleLogin}/>}
        <Routes>
          <Route path='/' exact element={<LoginForm login={login} handleLogin={handleLogin} />} />
          <Route path='/inicio' exact element={<HomePage />} />
          <Route path='/personal' exact element={<Personal />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
