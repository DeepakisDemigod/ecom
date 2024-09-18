import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  CLEAR_ERRORS
} from '../constants/userConstants.js';

import axios from 'axios';

// user login
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

// user REGISTER
export const register = userData => async dispatch => {
  try {
    dispatch({
      type: REGISTER_USER_REQUEST
    });

    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    const { data } = await axios.post(`/api/v1/register`, userData, config);
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message
    });
  }
};

// load user

export const loadUser = () => async dispatch => {
  try {
    dispatch({
      type: LOAD_USER_REQUEST
    });

    const config = { headers: { 'Content-Type': 'application/json' } };

    const { data } = await axios.get(`/api/v1/me`);

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.user
    });
  } catch (err) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: err.response.data.message
    });
  }
};

// Clearing Errors

export const clearErrors = () => async dispatch => {
  dispatch({
    type: CLEAR_ERRORS
  });
};
