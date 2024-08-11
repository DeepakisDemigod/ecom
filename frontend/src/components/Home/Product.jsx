import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';

const Product = ({ product }) => {
  const options = {
    edit: false,
    color: '#64748b',
    activeColor: '#22c55e',
    size: window.innerWidth < 600 ? 18 : 23,
    value: product.ratings,
    isHalf: true
  };
  return (
    <Link
      className='border border-zinc-600 mb-4 mr-4'
      to={`product/${product._id}`}
    >
      <div className='w-full h-64 max-w-xs mx-auto overflow-hidden'>
        <img
          src={product.images[0].url}
          alt={product.name}
          className='w-full h-full object-cover'
        />
      </div>
      <div className='p-2 pl-4 bg-zinc-900'>
        <p className='text-lg font-semibold'>{product.name}</p>
        <div className='flex items-center justify-start'>
          <span>{product.ratings} • </span>
          <ReactStars
            className='flex'
            {...options}
          />
          <span> • ({product.numOfReviews} Reviews)</span>
        </div>
        <div>
          <span>Category: </span>
          <span>{product.category}</span>
        </div>
        <span className='text-green-400 text-lg'>₹{product.price}</span>
      </div>
    </Link>
  );
};

export default Product;
