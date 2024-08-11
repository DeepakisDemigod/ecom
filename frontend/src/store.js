import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk } from 'redux-thunk';
import {
  productReducer,
  productDetailsReducer
} from './reducers/productReducers.js';

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
