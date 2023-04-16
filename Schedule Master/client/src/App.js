import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar";

import Home from "./components/home";
import Login from "./components/login";
import Selection from "./components/selection";
import Cart from "./components/cart";

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/selection' element={<Selection/>} />
      <Route path='/cart' element={<Cart/>} />
      </Routes>
    </div>
    
  );
}

export default App;
