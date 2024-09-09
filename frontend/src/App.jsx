import Header from './components/layout/Header/Header.jsx';
import Footer from './components/layout/Footer/Footer.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import ProductDetails from './components/Product/ProductDetails.jsx';
import Products from './components/Product/Products.jsx';
import Search from './components/Product/Search.jsx';
import LoginSignup from './components/user/LoginSignup.jsx'

function App() {
  return (
    <Router>
      <Header />
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
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
