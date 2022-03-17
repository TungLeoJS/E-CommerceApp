import React from 'react';
import { Cart } from './pages/Cart';
import Home from './pages/Home';
import { Login } from './pages/Login';
import { Product } from './pages/Product';
import { ProductList } from './pages/ProductList';
import { Register } from './pages/Register';
import { Pay } from './pages/Pay';
import { Success } from './pages/Success';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {} from '@material-ui/core';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/payment' element={<Pay/>}>
        </Route>
        <Route path='/success' element={<Success/>}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
