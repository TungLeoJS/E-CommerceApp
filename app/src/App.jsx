import React from 'react';
import { Cart } from './pages/Cart';
import Home from './pages/Home';
import { Login } from './pages/Login';
import { ProductDetail } from './pages/ProductDetail';
import { ProductList } from './pages/ProductList';
import { Register } from './pages/Register';
import { Pay } from './pages/Pay';
import { Success } from './pages/Success';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import {} from '@material-ui/core';

function App() {
  const user = false;
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />}></Route>
        <Route path='/products' element={<ProductList/>}></Route>
        <Route path='/products/:category' element={<ProductList />}></Route>
        <Route path='/product/:id' element={<ProductDetail />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='/success' element={<Success/>}></Route>
        <Route
          path='/login'
          element={user ? <Navigate to='/' /> : <Login />}
        ></Route>
        <Route
          path='/register'
          element={user ? <Navigate to='/' /> : <Register />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
