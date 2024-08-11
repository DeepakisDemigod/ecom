import React, { useEffect } from 'react';
import { MouseScroll } from '@phosphor-icons/react';
import Accordion from '../layout/Accordion/Accordion.jsx';
import Loader from '../layout/Loader/Loader.jsx';
import Product from './Product.jsx';
import MetaData from '../layout/MetaData.jsx';
import { getProduct } from '../../actions/productAction.js';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, products, productsCount } = useSelector(
    state => state.products
  );

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProduct());
    // console.log(getProduct())
  }, [dispatch, error, alert]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title='Home' />
          <div className='font-inter px-6'>
            <div className='flex flex-col items-center justify-start'>
              <p className='text-5xl my-8 font-bold text-center'>
                Games made <span className='text-green-500'>affordable</span> to
                everyone
              </p>
              <h1>
                Amazing games for your PlayStation and XBox at affordable
                prices, delivered to your doorstep
              </h1>
              <br />
              <br />
              <a href='#products'>
                <button className='font-inter text-white btn-disabled flex bg-green-500 p-2 items-center justify-center  px-5'>
                  <span>Scroll Down</span>
                  <MouseScroll size={20} />
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
                    <Product
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
