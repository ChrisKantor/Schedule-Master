import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar";

import Home from "./components/home";
import Login from "./components/login";

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login/>} />
  </Routes>
    </div>
    
  );
}

export default App;
