import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';
import './App.css';
import Home from './pages/home/Home';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import UserList from './pages/userList/UserList';
import User from './pages/user/User';
import NewUser from './pages/newUser/NewUser';
import ProductList from './pages/productList/ProductList';
import Product from './pages/product/Product';
import NewProduct from './pages/newProduct/NewProduct';
import { Login } from './pages/login/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  let admin = false;
  const localStorageData = JSON.parse(localStorage.getItem('persist:root'));
  if (localStorageData !== null && localStorageData.currentUser !== 'null') {
    const user = JSON.parse(localStorageData?.user);
    if (user !== null) {
      admin = user?.currentUser?.isAdmin || false;
    }
  }
  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route path='/login'>
          {admin ? <Redirect to="/" ></Redirect> : <Login />}
        </Route>
        {admin === false ? <Redirect to="/login"></Redirect>
        : (
          <>
            <Topbar />
            <div className='container'>
              <Sidebar />
              <Route exact path='/'>
                <Home />
              </Route>
              <Route path='/users'>
                <UserList />
              </Route>
              <Route path='/user/:userId'>
                <User />
              </Route>
              <Route path='/newUser'>
                <NewUser />
              </Route>
              <Route path='/products'>
                <ProductList />
              </Route>
              <Route path='/product/:productId'>
                <Product />
              </Route>
              <Route path='/newproduct'>
                <NewProduct />
              </Route>
            </div>
          </>
        )}
      </Switch>
    </Router>
  );
}

export default App;
