import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import {Base} from './pages/Base';
import MarketPlace from './pages/MarketPlace';
import Cart from "./pages/Cart";
import OrderPage from "./pages/Order";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App wrapper">
        <Router>
          <Routes>
            <Route element={<Base/>}>
              <Route path="/" element={<Navigate to="/marketplace"/>}/>
              <Route path="/marketplace" element={<MarketPlace/>}/>
              <Route path="/cart" element={<Cart/>}/>
              <Route path="/order" element={<OrderPage/>}/>
            </Route>
          </Routes>
        </Router>
      </div>
    </LocalizationProvider>
  );
}

export default App;
