import { useEffect } from 'react';
import Header from './components/layout/Header/Header.jsx';
import Footer from './components/layout/Footer/Footer.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import ProductDetails from './components/Product/ProductDetails.jsx';
import Products from './components/Product/Products.jsx';
import Search from './components/Product/Search.jsx';
import NotFound from './components/layout/NotFound.jsx'
import LoginSignup from './components/user/LoginSignup.jsx';
import store from './store.js';
import { useSelector } from 'react-redux';
import { loadUser } from './actions/userAction.js';
import UserOptions from './components/layout/Header/UserOptions.jsx';

function App() {
  const { isAuthenticated, user } = useSelector(state => state.user);

  useEffect(() => {
    store.dispatch(loadUser);
  }, []);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route
          exact
          path='/'
          element={<Home />}
        />
        <Route
          exact
          path='/product/:id'
          element={<ProductDetails />}
        />
        <Route
          exact
          path='/products'
          element={<Products />}
        />
        <Route
          path='/products/:keyword'
          element={<Products />}
        />
        <Route
          exact
          path='/search'
          element={<Search />}
        />
        <Route
          exact
          path='/login'
          element={<LoginSignup />}
        />
        <Route
          path='/*'
          element={<NotFound />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
