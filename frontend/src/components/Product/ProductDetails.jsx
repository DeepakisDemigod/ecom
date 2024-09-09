import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearErrors, getProductDetails } from '../../actions/productAction.js';
import ReactStars from 'react-rating-stars-component';
import ReviewCard from './ReviewCard.jsx';
import Loader from '../layout/Loader/Loader.jsx';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData.jsx';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();

  const { product, loading, error } = useSelector(
    state => state.productDetails
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert]);

  const options = {
    className: 'stars',
    edit: false,
    color: '#64748b',
    activeColor: '#22c55e',
    size: window.innerWidth < 600 ? 20 : 25,
    value: product?.ratings,
    isHalf: true
  };

  // Format the price to Indian Rupees (INR)
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR' // Adjust currency if necessary
  }).format(product?.price || 0);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        product && (
          <>
            <MetaData title={`${product.name} | Ecommerce`} />
            <div>
              <div className='md:flex'>
                <div className='carousel flex-[0.5]'>
                  {product.images &&
                    product.images.map((item, i) => (
                      <img
                        key={item.url}
                        src={item.url}
                        alt={`${i} slide`}
                      />
                    ))}
                </div>
                <div className='flex-[0.5] card bg-base-100 w-auto shadow-xl m-0 p-0'>
                  <div className='card-body'>
                    <h2 className='card-title'>
                      <p className='font-bold text-3xl'>{product.name}</p>
                      <div className='rounded-lg text-[10px] text-white font-bold bg-green-600 w-8 flex items-center justify-center h-6'>
                        NEW
                      </div>
                    </h2>
                    <span className='text-xs'>Product ID: {product._id}</span>
                    <div className='mt-[-4px] ml-1 flex flex-wrap items-center text-xs'>
                      <span className='mr-1 text-zinc-400'>
                        ({product.ratings}/5)
                      </span>
                      <ReactStars {...options} />
                      <span className='mt-1 ml-2 text-zinc-400'>
                        {`${product.numOfReviews} ${
                          product.numOfReviews <= 1 ? 'review' : 'reviews'
                        }`}
                      </span>
                    </div>
                    <h3 className='font-semibold text-2xl w-16 '>
                      {formattedPrice}
                    </h3>
                    <div className='card-actions justify-end'>
                      <p>
                        <div>
                          <span
                            className={
                              product.Stock < 1
                                ? 'text-red-400 font-bold'
                                : 'text-green-400 font-bold'
                            }
                          >
                            {product.Stock < 1 ? 'Out of Stock' : 'In Stock'}
                          </span>
                        </div>
                      </p>
                    </div>
                    <div className='flex gap-1.5 h-10'>
                      <div className='flex'>
                        <button className='bg-neutral w-8 font-bold text-base'>
                          +
                        </button>
                        <input
                          type='number'
                          className='bg-[#a6aebc] text-black font-extrabold w-12 text-center'
                        />
                        <button className='bg-neutral w-8 font-bold text-base'>
                          -
                        </button>
                      </div>
                      <br />
                      <button className='flex items-center justify-center bg-green-600 gap-1.5 text-white w-full rounded-md py-2 px-6'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-4 w-4'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                          />
                        </svg>
                        <span className='font-bold text-sm'>Add to Cart</span>
                      </button>
                    </div>
                    <div>
                      <h3 className='text-xl font-bold text-zinc-200'>
                        Game Description
                      </h3>
                      <p className='p-2 text-sm text-zinc-400'>{product.description}</p>
                    </div>
                    <div>
                      <button className='h-10 flex items-center justify-center bg-green-600 gap-1.5 text-white w-full rounded-md py-2 px-6 font-bold'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='12'
                          height='12'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          className='feather feather-search font-bold '
                        >
                          <circle
                            cx='11'
                            cy='11'
                            r='8'
                          ></circle>
                          <line
                            x1='23'
                            y1='23'
                            x2='16.25'
                            y2='16.25'
                          ></line>
                        </svg>
                        <span className='font-bold text-sm'>
                          {' '}
                          Submit Review
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className='m-8'>
                <h3 className='flex items-center gap-0.5 text-2xl font-bold'>
                  <span>Reviews</span>
                  <span className='text-zinc-300 text-[17.5px]'>
                    ({product.numOfReviews})
                  </span>
                </h3>
                <br />
                {product.reviews && product.reviews.length > 0 ? (
                  <div>
                    {product.reviews.map(review => (
                      <ReviewCard
                        key={review._id}
                        review={review}
                      />
                    ))}
                  </div>
                ) : (
                  <p>No Reviews yet</p>
                )}
              </div>
            </div>
          </>
        )
      )}
    </>
  );
};

export default ProductDetails;
