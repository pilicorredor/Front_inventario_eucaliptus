import logo from './logo.svg';
import './App.css';
import LoginForm from './Components/LoginForm/LoginForm';
import HomePage from './Components/HomePage/HomePage';
import Personal from './Components/Personal/Personal';
import Navbar from './Components/SideNavbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    // <div>
    //   <LoginForm/>
    // </div>
    // <div>
    // <HomePage />
    // </div>
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/inicio' exact Component={HomePage} />
          <Route path='/personal' exact Component={Personal} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
