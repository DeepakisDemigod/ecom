const app = require('./app');

const dotenv = require('dotenv');
const connectDatabase = require('./config/database.js');

// Handling Uncaught Exception
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  console.error('Shutting Down The Server Due to Uncaught Exception');
  process.exit(1);
});



// config
dotenv.config({ path: 'backend/config/config.env' });

// connecting db
connectDatabase();

const server = app.listen(process.env.PORT, '127.0.0.1', () => {
  console.log(`server is working on port ${process.env.PORT}`);
});

// unhandled promise

process.on('unhandledRejection', err => {
  console.error(`Error: ${err.message}`);
  console.error('Shutting Down The Server Due to Unhandeled Promise Rejection');
  server.close(() => {
    process.exit(1);
  });
});
