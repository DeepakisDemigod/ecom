import React from 'react';
import { Link } from 'react-router-dom';

const CartItemCard = ({ item }) => {
  return (
    <div className='flex items-center gap-4 p-4 bg-white rounded-lg shadow'>
      <img
        width='45'
        src={item.image}
        alt={item.name}
        className='object-cover rounded'
      />
      <div className='flex flex-col'>
        <Link
          to={`/product/${item.product}`}
          className='text-lg font-medium hover:text-blue-600'
        >
          {item.name}
        </Link>
        <span className='text-gray-600'>{`Price: ₹${item.price}`}</span>
      </div>
    </div>
  );
};

export default CartItemCard;
