import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERRORS
} from '../constants/userConstants.js';

import axios from 'axios';

export const login = (email, password) => async dispatch => {
  try {
    dispatch({
      type: LOGIN_REQUEST
    });

    const config = { headers: { 'Content-Type': 'application/json' } };

    const { data } = await axios.post(
      `/api/v1/login`,
      { email, password },
      config
    );
    
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user
    });
    
    
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data.message
    });
  }
};


// Clearing Errors 

export const clearErrors = () => async (dispatch ) => {
  dispatch({
    type: CLEAR_ERRORS
  })
}