import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk } from 'redux-thunk';
import {
  productReducer,
  productDetailsReducer
} from './reducers/productReducers.js';
import {
  userReducer,
  profileReducer,
  forgotPasswordReducer
} from './reducers/userReducer.js';

import { cartReducer } from './reducers/cartReducer.js';
import { addItemsToCart } from './actions/cartAction.js';

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
      shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem("shippingInfo")) : {}
  }
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
