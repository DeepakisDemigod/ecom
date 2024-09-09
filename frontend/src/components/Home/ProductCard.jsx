import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';

const ProductCard = ({ product }) => {
  const options = {
    className: 'stars',
    edit: false,
    color: '#64748b',
    activeColor: '#22c55e',
    size: window.innerWidth < 600 ? 18 : 23,
    value: product.ratings,
    isHalf: true
  };

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR' // Change this to the appropriate currency if needed
  }).format(product.price);

  return (
    <Link
      className='mb-4 mr-4 text-xs'
      to={`product/${product._id}`}
    >
      <div className='md:flex h-full shadow-lg'>
        <div className='w-36 w-full max-w-xs mx-auto overflow-hidden'>
          <img
            src={product.images[0].url}
            alt={product.name}
            className='w-full h-full object-cover'
          />
        </div>
        <div className='p-2 pl-4 bg-[#212d3b] bg-[#070f1a] shadow'>
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
          <span className='text-green-400 text-lg'>{formattedPrice}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
