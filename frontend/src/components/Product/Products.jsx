import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction.js';
import { useParams } from 'react-router-dom';
import Loader from '../layout/Loader/Loader.jsx';
import ProductCard from '../Home/ProductCard.jsx';
import Pagination from 'react-js-pagination';
import Slider from '@mui/material/Slider';

const categories = ['grafics', 'game', 'phone', 'RRRRR'];

const Products = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState('');
  const [ratings, setRatings] = useState()
  
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
    dispatch(getProduct(keyword, currentPage, price, category));
  }, [dispatch, keyword, currentPage, price, category]);

  let count = filteredProductsCount;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2 className='text-2xl sm:text-3xl md:text-4xl m-4 sm:m-6 md:m-8 text-center underline font-bold'>
            Products
          </h2>
          <div className='flex flex-col md:flex-row m-4 sm:m-6 md:m-10 justify-between'>
            <div className='w-[30vmax] md:w-[10vmax] mb-4 md:mb-0'>
              <p>Price</p>
              <Slider
                className="slider"
                value={price}
                onChange={priceHandler}
                valueLabelDisplay='auto'
                aria-labelledby='range-slider'
                min={0}
                max={25000}
              />
              <p>Categories</p>
              <ul className='flex font-mono gap-0.5 px-1.5'>
                {categories.map(category => (
                  <li
                    className='text-xs font-semibold bg-green-600 rounded p-1'
                    key={category}
                    onClick={() => setCategory(category)}
                  >
                    {category} {/* Render category name */}
                  </li>
                ))}
              </ul>
              
              <fieldset>
                <legend>Ratings Above</legend>
                <Slider
                  value={ratings}
                  onChange={(e, newRating) => {
                    setRatings(newRating)
                  }}
                  aria-labelledby="continuous-slider"
                  min={0}
                  max={5}
                />
              </fieldset>
            </div>
            <div className='flex flex-wrap justify-center w-full'>
              {products &&
                products.map(product => (
                  <div
                    key={product._id}
                    className='w-full sm:w-[50vmax] md:w-[50vmax] lg:w-1/4 p-2'
                  >
                    <ProductCard
                      key={product._id}
                      product={product}
                    />
                  </div>
                ))}
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
