const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error.js");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const dotenv = require("dotenv");

// config
dotenv.config({ path: "backend/config/config.env" });
console.log(process.env.STRIPE_API_KEY)
console.log(process.env.STRIPE_SECRET)

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./tmp/", // or any valid temporary directory
  })
);

// Route Imports
const product = require("./routes/productRoute.js");
const user = require("./routes/userRoutes.js");
const order = require("./routes/orderRoute.js");
const payment = require("./routes/paymentRoute.js");

let reqCount = 0;

app.use((req, res, next) => {
  reqCount += 1;
  const now = new Date().toISOString();
  console.log(`➜ Req Nr ${reqCount} ${req.method} ${req.url} [${now}]`);
  next();
});

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);
// Middleware for Errors

app.use(errorMiddleware);

module.exports = app;
