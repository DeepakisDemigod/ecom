import { ADD_TO_CART, REMOVE_CART_ITEM } from '../constants/cartConstants.js';

export const cartReducer = (state = { cartItems: [] }, action) => {
  // Ensure cartItems is null-safe
  const cartItems = state.cartItems.filter(item => item !== null);

  switch (action.type) {
    case ADD_TO_CART:
      const item = {
        ...action.payload,
        quantity: action.payload.quantity || 1 // Set default quantity if not provided
      };

      if (!item.product) {
        console.warn('Invalid item payload:', item);
        return { ...state, cartItems };
      }

      console.log('Item Fetched', item);
      console.log('Current State:', state);

      // Check if the item already exists in the cart
      const isItemExist = cartItems.find(i => i.product === item.product);

      if (isItemExist) {
        return {
          ...state,
          cartItems: cartItems.map(i =>
            i.product === isItemExist.product ? item : i
          )
        };
      } else {
        return {
          ...state,
          cartItems: [...cartItems, item]
        };
      }

    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(i => i.product !== action.payload)
      };

    default:
      return { ...state, cartItems };
  }
};
