const Order = require('../models/orderModel.js');
const Product = require('../models/productModel.js');
const ErrorHandler = require('../utils/errorhandler.js');
const catchAsyncErrors = require('../middleware/catchAsyncErrors.js');

exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id
  });

  res.status(201).json({
    success: true,
    order
  });
});

// get single order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (!order) {
    return next(new ErrorHandler('Order mot found with this Id', 404));
  }

  res.status(200).json({
    success: true,
    order
  });
});

// get logged in user order
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    order
  });
});

// get all orders
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.find();

  let totalAmount = 0;
  order.forEach(order => {
    totalAmount += order.totalPrice;
  });
  res.status(200).json({
    success: true,
    totalAmount,
    order
  });
});

// update order status
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler('Order not found with this Id', 404));
  }

  if (order.orderStatus === 'Delivered') {
    return next(new ErrorHandler('you are already delivered this order', 404));
  }

  order.orderItems.forEach(async order => {
    await updateStock(order.product, order.quantity);
  });

  order.orderStatus = req.body.status;

  if (req.body.status === 'Delivered') {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.Stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

// delete order -- admin

exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler('Order not found with this Id', 404));
  }
  await order.deleteOne({ _id: req.params.id });

  res.status(200).json({
    success: true
  });
});
