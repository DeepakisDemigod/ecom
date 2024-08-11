const express = require('express');
const app = express();


const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middleware/error.js');
const cors = require('cors')

app.use(express.json());
app.use(cookieParser());
app.use(cors())


// Route Imports
const product = require('./routes/productRoute.js');
const user = require('./routes/userRoutes.js');
const order = require('./routes/orderRoute.js')

app.use((req, res, next) => {
  const now = new Date().toISOString();
  console.log(`${req.method} ${req.url} [${now}]`);
  next();
});

app.use('/api/v1', product);
app.use('/api/v1', user);
app.use('/api/v1', order);
// Middleware for Errors

app.use(errorMiddleware);

module.exports = app;
