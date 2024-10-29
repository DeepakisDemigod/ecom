import React from 'react';
import { Link } from 'react-router-dom';

const CartItemCard = ({ item }) => {
  return (
    <div>
      <img
        width='30'
        src={item.image}
      />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: ₹${item.price}`}</span>
          </div>
    </div>
  );
};

export default CartItemCard;
