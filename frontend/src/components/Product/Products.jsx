import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction.js';
import { useParams, Link } from 'react-router-dom'; // Ensure Link is imported
import Loader from '../layout/Loader/Loader.jsx';
import ProductCard from '../Home/ProductCard.jsx';
import Pagination from 'react-js-pagination';
import Slider from '@mui/material/Slider';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData.jsx';

const categories = ['grafics', 'game', 'phone', 'RRRRR'];

const Products = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState('');
  const [ratings, setRatings] = useState(0);

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount
  } = useSelector(state => state.products);

  const { keyword } = useParams();

  const setCurrentPageNo = e => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, error, alert]);

  let count = filteredProductsCount;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title='Ecommerce Products' />
          <div className='flex gap-12 flex-col md:flex-row m-4 sm:m-6 md:m-10 justify-between'>
            <div className='p-4 w-full m-auto w-[30vmax] bg-[#212d3b] md:w-[10vmax] mb-4 md:mb-0'>
              {products.length > 0 ? (
                <>
                  <div className='m-4'>
                    <p>Price</p>
                    <Slider
                      className='slider m-auto'
                      value={price}
                      onChange={priceHandler}
                      valueLabelDisplay='auto'
                      aria-labelledby='range-slider'
                      min={0}
                      max={25000}
                    />
                    <p>Browse by</p>
                    <ul className='flex mb-4 font-mono gap-0.5 px-1.5'>
                      {categories.map(category => (
                        <li
                          className='text-xs font-semibold bg-green-600 rounded p-1 cursor-pointer'
                          key={category}
                          onClick={() => setCategory(category)}
                        >
                          {category}
                        </li>
                      ))}
                    </ul>

                    <fieldset>
                      <legend>Ratings Above</legend>
                      <Slider
                        className='m-auto'
                        value={ratings}
                        onChange={(e, newRating) => setRatings(newRating)}
                        aria-labelledby='continuous-slider'
                        valueLabelDisplay='auto'
                        min={0}
                        max={5}
                      />
                    </fieldset>
                  </div>
                </>
              ) : (
                <span className='text-sm text-zinc-400'>
                  Try searching{' '}
                  <a
                    className='text-green-300 underline'
                    href='http://localhost:5173/products/GTA'
                  >
                    gta
                  </a>
                </span>
              )}
            </div>
            <h2
              className='text-4xl text-center my-8 mx-2 font-bold'
              id='products'
            >
              Products
            </h2>
            <div className='flex flex-wrap justify-center w-full min-h-[40vh]'>
              {products && products.length > 0 ? (
                products.map(product => (
                  <Link
                    key={product._id}
                    className='md:flex mb-4 mr-4 w-full sm:w-[50vmax] md:w-[50vmax] lg:w-1/4 p-2'
                    to={`/product/${product._id}`} // <-- Updated here
                  >
                    <ProductCard
                      key={product._id}
                      product={product}
                    />
                  </Link>
                ))
              ) : (
                <span className='text-zinc-400'>No products found</span>
              )}
            </div>
          </div>
          <div>
            {resultPerPage < count && (
              <div className='flex items-center justify-center mt-4'>
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resultPerPage}
                  totalItemsCount={productsCount}
                  onChange={setCurrentPageNo}
                  nextPageText='Next'
                  prevPageText='Prev'
                  firstPageText='1st'
                  lastPageText='Last'
                  itemClass='page-item'
                  linkClass='page-link'
                  activeClass='bg-green-600 font-bold text-white'
                  activeLinkClass='pageLinkActive'
                />
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Products;
