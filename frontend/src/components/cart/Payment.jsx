import React, { useState, useEffect, useRef } from 'react';
import CheckoutSteps from '../cart/CheckoutSteps.jsx';
import { useSelector, useDispatch } from 'react-redux';
import MetaData from '../layout/MetaData.jsx';
import { Typography, message } from 'antd';
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import axios from "axios"



const Payment = () => {
  
  return <div>
    <CheckoutSteps activeStep={2} />
  </div>;
};

export default Payment;
