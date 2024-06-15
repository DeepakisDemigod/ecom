const express = require('express');
const app = express();

const errorMiddleware = require('./middleware/error.js');

app.use(express.json());

// Route Imports
const product = require('./routes/productRoute.js');

app.use('/api/v1', product);

// Middleware for Errors

app.use(errorMiddleware)

module.exports = app;
