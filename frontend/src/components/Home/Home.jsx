import React, { useEffect } from 'react';
import { ShoppingBag } from '@phosphor-icons/react';
import Accordion from '../layout/Accordion/Accordion.jsx';
import Loader from '../layout/Loader/Loader.jsx';
import ProductCard from './ProductCard.jsx';
import MetaData from '../layout/MetaData.jsx';
import { clearErrors, getProduct } from '../../actions/productAction.js';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector(state => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  console.log(products);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title='Home' />
          <div className='font-inter px-6'>
            <div className='flex flex-col items-center justify-start'>
              <p className='text-lg font-light my-8 text-center'>
                games made{' '}
                <span className='font-semibold text-green-500'>affordable</span>{' '}
                to everyone, Shop now for exclusive deals on your favourite  games.
              </p>
              <br />
              <br />
              <a href='/products'>
                <button className='rounded-3xl font-inter gap-1.5 text-white btn-disabled flex bg-green-500 p-2 items-center justify-center  px-5'>
                  <ShoppingBag size={22} />
                  <span>Shop Now</span>
                </button>
              </a>
            </div>
            <div>
              <h2
                className='text-4xl my-8 font-bold'
                id='products'
              >
                Featured Products
              </h2>
              <div className='flex flex-wrap justify-center'>
                {products &&
                  products.map(product => (
                    <ProductCard
                      key={product._id}
                      product={product}
                    />
                  ))}
              </div>
            </div>
            <Accordion />
          </div>
        </>
      )}
    </>
  );
};

export default Home;
